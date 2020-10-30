import axios from "axios";
import firebase from "firebase";

const state = {
  user: null,
  userChatContact: null,
  userChatContactMessages: [],
  userChatContacts: [],
  users: [],
  componentKey: 0,
};

const getters = {
  user(state) {
    return state.user;
  },
  userChatContacts(state) {
    return state.userChatContacts;
  },
  userChatContactMessages(state) {
    return state.userChatContactMessages;
  },
  userChatContactsSorted(state) {
    return state.userChatContacts.sort(
      (a, b) => b.lastTimestamp - a.lastTimestamp
    );
  },
  componentKey(state) {
    return state.componentKey;
  },
  userChatContact(state) {
    return state.userChatContact;
  },
  users(state) {
    return state.users;
  },
};

const mutations = {
  emptyMessages(state) {
    state.userChatContactMessages = [];
  },
  storeUser(state, userData) {
    state.user = userData;
  },

  storeMessageList(state, payload) {
    state.userChatContacts = payload;
  },

  forceRerender(state) {
    state.componentKey += 1;
  },

  storeUserChatContact(state, receiver) {
    state.userChatContact = receiver;
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
    state.userChatContactMessages.push(messageObj);
  },

  storeUserChatContactMessages(state, userChatContactMessages) {
    state.userChatContactMessages = userChatContactMessages;
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

  fetchUser({ commit, dispatch, rootState }) {
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

        dispatch("fetchMessages");
      })
      .catch((err) => console.log(err));
  },

  storeMessage({ state, commit, dispatch }, message) {
    const timestamp = new Date().getTime();

    const messageObj = {
      senderId: state.user.localId,
      receiverId: state.userChatContact.localId,
      message: message,
      timestamp: timestamp,
    };

    const currentSession = messageObj;
    currentSession.type = "sent";
    commit("storeMessage", currentSession);

    localStorage.setItem(
      "userChatContactMessages",
      JSON.stringify(state.userChatContactMessages)
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

        const userChatContacts = [];

        uniqueContactIds.forEach((contactId) => {
          const contactDataFromUsers = state.users.find(
            (user) => user.localId === contactId
          );
          userChatContacts.push(contactDataFromUsers);
        });

        // Users of the current user message list
        userChatContacts.forEach((contact) => {
          const userChatContactsFiltered = messages.filter(
            (message) =>
              (message.receiverId === contact.localId &&
                message.senderId === userId) ||
              (message.receiverId === userId &&
                message.senderId === contact.localId)
          );

          const userChatContactsFilteredFormatted = [];
          const messageUsertoContact = userChatContactsFiltered.filter(
            (message) => message.senderId === userId
          );

          messageUsertoContact.forEach((message) => {
            return (message.type = "sent");
          });

          const messageContactToUser = userChatContactsFiltered.filter(
            (message) => message.receiverId === userId
          );

          messageContactToUser.forEach((message) => {
            return (message.type = "received");
          });

          const concatChat = messageUsertoContact.concat(messageContactToUser);
          userChatContactsFilteredFormatted.push(concatChat);

          contact.messages = userChatContactsFilteredFormatted[0].sort(
            (a, b) => b.timestamp - a.timestamp
          );

          const lastTimestamp = userChatContactsFilteredFormatted[0].sort(
            (a, b) => a.timestamp - b.timestamp
          );

          contact.lastTimestamp =
            lastTimestamp[lastTimestamp.length - 1].timestamp;
        });

        commit("storeMessageList", userChatContacts);
        localStorage.setItem("messageList", JSON.stringify(userChatContacts));

        if (!state.userChatContact && state.userChatContacts.length) {
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

          const setMostRecentChat = userChatContacts.find(
            (contact) => contact.localId === weFoundIt
          );
          dispatch("chatWithContact", setMostRecentChat);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  chatWithContact({ commit, dispatch }, contact) {
    commit("storeUserChatContact", contact);
    localStorage.setItem("userChatContact", JSON.stringify(contact));

    commit("emptyMessages");

    if (contact.messages) {
      commit("storeUserChatContactMessages", contact.messages);
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
