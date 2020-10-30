import axios from "axios";
import firebase from "firebase";

const state = {
  user: null,
  userMessageReceiver: null,
  users: [],
  messages: [],
  contactMessages: [],
  selectedContactMessages: [],
  componentKey: 0,
  isDataFetched: false,
  areMessagesLoaded: false,
};

const getters = {
  user(state) {
    return state.user;
  },
  contactMessages(state) {
    return state.contactMessages;
  },
  selectedContactMessages(state) {
    return state.selectedContactMessages;
  },
  userContactMessagesSorted(state) {
    return state.contactMessages.sort(
      (a, b) => b.lastTimestamp - a.lastTimestamp
    );
  },
  areMessagesLoaded(state) {
    return state.areMessagesLoaded;
  },
  isDataFetched(state) {
    return state.isDataFetched;
  },
  componentKey(state) {
    return state.componentKey;
  },
  userMessageReceiver(state) {
    return state.userMessageReceiver;
  },
  users(state) {
    return state.users;
  },
};

const mutations = {
  emptyMessages(state) {
    state.selectedContactMessages = [];
  },
  storeUser(state, userData) {
    state.user = userData;
  },

  storeMessageList(state, payload) {
    state.contactMessages = payload;
  },

  forceRerender(state) {
    state.componentKey += 1;
  },

  storeUserMessageReceiver(state, receiver) {
    state.userMessageReceiver = receiver;
  },

  storeUsers(state, userData) {
    state.users = userData;
  },

  storeLocalStorageUser(_, authData) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + authData.expiresIn * 1000);
    localStorage.setItem("tokenId", authData.tokenId);
    localStorage.setItem("userId", authData.localId);
    localStorage.setItem("userData", authData.userData);
    localStorage.setItem("expiresIn", expirationDate);
  },

  addUserContact(state, newContact) {
    state.user.contacts.push(newContact);
    state.users = state.users.filter(
      (user) => user.localId !== newContact.localId
    );
  },
  storeMessage(state, messageObj) {
    state.selectedContactMessages.push(messageObj);
  },

  storeSelectedContactMessages(state, selectedContactMessages) {
    state.selectedContactMessages = selectedContactMessages;
  },
};

const actions = {
  storeUser({ commit, dispatch }, authData) {
    axios
      .post("https://message-app-719f5.firebaseio.com/users.json", authData)
      .then((res) => {
        const key = res.data.name;
        authData.key = key;
        commit("storeUser", authData);
        dispatch("fetchUser");
      })
      .catch((err) => console.log(err));
  },

  fetchUser({ state, commit, dispatch, rootState }) {
    axios
      .get("https://message-app-719f5.firebaseio.com/users.json")
      .then((res) => {
        console.log(res);
        const data = res.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          user.key = key;
          users.push(user);
        }

        const activeUser = users.find((user) => {
          return user.localId === rootState.auth.userId;
        });

        const otherUsers = users.filter(
          (user) => rootState.auth.userId !== user.localId
        );

        localStorage.setItem("storeUser", JSON.stringify(activeUser));
        localStorage.setItem("storeUsers", JSON.stringify(otherUsers));
        commit("storeUser", activeUser);
        commit("storeUsers", otherUsers);

        state.isDataFetched = true;
        dispatch("fetchMessages");
      })
      .catch((err) => console.log(err));
  },

  storeMessage({ state, commit, dispatch }, message) {
    const timestamp = new Date().getTime();

    const messageObj = {
      senderId: state.user.localId,
      receiverId: state.userMessageReceiver.localId,
      message: message,
      timestamp: timestamp,
    };

    const currentSession = messageObj;
    currentSession.type = "sent";
    commit("storeMessage", currentSession);

    localStorage.setItem(
      "selectedContactMessages",
      JSON.stringify(state.selectedContactMessages)
    );

    firebase
      .database()
      .ref(`messages`)
      .push(messageObj)
      .then((res) => {
        console.log(res);
        dispatch("fetchMessages");
        dispatch("switchToUserMessages");
      })
      .catch((err) => console.log(err));
  },

  fetchMessages({ state, commit, dispatch }) {
    axios
      .get("https://message-app-719f5.firebaseio.com/messages.json")
      .then((res) => {
        const data = res.data;
        const messages = [];
        for (let key in data) {
          const message = data[key];
          messages.push(message);
        }

        const userId = state.user.localId;

        // Find all messages related to the currentUser
        const findContactIds = messages
          .filter(
            (message) =>
              message.receiverId === userId || message.senderId === userId
          )
          .map((message) => {
            const weFoundIt =
              message.senderId === userId
                ? message.receiverId
                : message.senderId;
            return weFoundIt;
          });

        // Find unique Ids between current user chats
        const _ = require("lodash");
        const uniqueContactIds = _.uniq(findContactIds, "localId").filter(
          (id) => id !== userId
        );

        const contactMessages = [];

        uniqueContactIds.forEach((contactId) => {
          const contactDataFromUsers = state.users.find(
            (user) => user.localId === contactId
          );
          contactMessages.push(contactDataFromUsers);
        });

        // Users of the current user message list
        contactMessages.forEach((contact) => {
          const contactMessagesFiltered = messages.filter(
            (message) =>
              (message.receiverId === contact.localId &&
                message.senderId === userId) ||
              (message.receiverId === userId &&
                message.senderId === contact.localId)
          );

          const contactMessagesFilteredFormatted = [];
          const messageUsertoContact = contactMessagesFiltered.filter(
            (message) => message.senderId === userId
          );

          messageUsertoContact.forEach((message) => {
            return (message.type = "sent");
          });

          const messageContactToUser = contactMessagesFiltered.filter(
            (message) => message.receiverId === userId
          );

          messageContactToUser.forEach((message) => {
            return (message.type = "received");
          });

          const concatChat = messageUsertoContact.concat(messageContactToUser);
          contactMessagesFilteredFormatted.push(concatChat);

          contact.messages = contactMessagesFilteredFormatted[0].sort(
            (a, b) => b.timestamp - a.timestamp
          );

          const lastTimestamp = contactMessagesFilteredFormatted[0].sort(
            (a, b) => a.timestamp - b.timestamp
          );

          contact.lastTimestamp =
            lastTimestamp[lastTimestamp.length - 1].timestamp;
        });

        commit("storeMessageList", contactMessages);
        localStorage.setItem("messageList", JSON.stringify(contactMessages));

        if (!state.userMessageReceiver && state.contactMessages.length) {
          // Find last user message
          const findLastUserMessage = messages.filter(
            (message) =>
              message.receiverId === userId || message.senderId === userId
          );

          const lastUserMessage =
            findLastUserMessage[findLastUserMessage.length - 1];

          const weFoundIt =
            lastUserMessage.senderId === userId
              ? lastUserMessage.receiverId
              : lastUserMessage.senderId;

          const setMostRecentChat = contactMessages.find(
            (contact) => contact.localId === weFoundIt
          );
          dispatch("chatWithContact", setMostRecentChat);
        }

        state.areMessagesLoaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  chatWithContact({ commit, dispatch }, contact) {
    commit("storeUserMessageReceiver", contact);
    localStorage.setItem("userMessageReceiver", JSON.stringify(contact));

    commit("emptyMessages");

    if (contact.messages) {
      commit("storeSelectedContactMessages", contact.messages);
    }
    dispatch("switchToUserMessages");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
