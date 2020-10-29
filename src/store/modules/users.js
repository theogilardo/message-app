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
  // selectedContactMessagesLength(state) {
  //   return state.selectedContactMessages.length;
  // },
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
    console.log(state.selectedContactMessages);
    state.selectedContactMessages.push(messageObj);
  },

  storeSelectedContactMessages(state, selectedContactMessages) {
    state.selectedContactMessages = selectedContactMessages.messages;
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

        // console.log(activeUser);
        // console.log(otherUsers);
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
    // dispatch("updateUserContact", message);

    const timestamp = new Date().getTime();

    console.log(state.userMessageReceiver.localId);

    const messageObj = {
      senderId: state.user.localId,
      receiverId: state.userMessageReceiver.localId,
      message: message,
      timestamp: timestamp,
    };

    console.log(messageObj);

    const currentSession = messageObj;
    currentSession.type = "sent";
    commit("storeMessage", currentSession);

    firebase
      .database()
      .ref(`messages`)
      .push(messageObj)
      .then((res) => {
        console.log(res);
        // dispatch("fetchContactMessages");
        dispatch("fetchMessages");
        dispatch("switchToMessages");
      })
      .catch((err) => console.log(err));
  },

  // fetchContactMessages({ state, commit }) {
  //   axios
  //     .get("https://message-app-719f5.firebaseio.com/messages.json")
  //     .then((res) => {
  //       const data = res.data;
  //       const messages = [];
  //       for (let key in data) {
  //         const message = data[key];
  //         messages.push(message);
  //       }
  //       // Check for most recent chat

  //       // if (state.contactMessages) {
  //       //   dispatch("chatWithContact", state.contactMessages[0]);
  //       // }

  //       const conversation = [];
  //       const userId = state.user.localId;
  //       const contactId = state.userMessageReceiver.localId;

  //       //

  //       const messageUsertoContact = messages.filter(
  //         (message) =>
  //           message.senderId === userId && message.receiverId === contactId
  //       );

  //       messageUsertoContact.forEach((message) => {
  //         return (message.type = "sent");
  //       });

  //       const messageContactToUser = messages.filter(
  //         (message) =>
  //           message.receiverId === userId && message.senderId === contactId
  //       );

  //       messageContactToUser.forEach((message) => {
  //         return (message.type = "received");
  //       });

  //       const concatChat = messageUsertoContact.concat(messageContactToUser);
  //       conversation.push(concatChat);

  //       const sortConversation = conversation[0].sort(
  //         (a, b) => a.timestamp - b.timestamp
  //       );

  //       commit("storeMessages", sortConversation);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },

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

        // Get all messages
        // console.log(messages);

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

        // console.log(findContactIds);

        // Find unique Ids between current user chats
        const _ = require("lodash");
        const uniqueContactIds = _.uniq(findContactIds, "localId").filter(
          (id) => id !== userId
        );

        // console.log(uniqueContactIds);
        console.log(state.users);

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
          // Modify contactMessagesFiltered

          // contact.messages = contactMessagesFiltered;

          // console.log(contactMessagesFiltered);

          // Add the filters here
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

          // console.log(contactMessagesFilteredFormatted);
          // console.log(contactMessagesFilteredFormatted[0]);

          contact.messages = contactMessagesFilteredFormatted[0].sort(
            (a, b) => b.timestamp - a.timestamp
          );

          const lastTimestamp = contactMessagesFilteredFormatted[0].sort(
            (a, b) => a.timestamp - b.timestamp
          );

          contact.lastTimestamp =
            lastTimestamp[lastTimestamp.length - 1].timestamp;
        });

        // console.log(contactMessages);

        commit("storeMessageList", contactMessages);
        localStorage.setItem("messageList", JSON.stringify(contactMessages));

        if (!state.userMessageReceiver && state.contactMessages.length) {
          // Find last user message
          const findLastUserMessage = messages.filter(
            (message) =>
              message.receiverId === userId || message.senderId === userId
          );

          // console.log(findLastUserMessage);

          const lastUserMessage =
            findLastUserMessage[findLastUserMessage.length - 1];

          const weFoundIt =
            lastUserMessage.senderId === userId
              ? lastUserMessage.receiverId
              : lastUserMessage.senderId;

          // console.log(lastUserMessage);
          // console.log(weFoundIt);
          // console.log(contactMessages);

          const setMostRecentChat = contactMessages.find(
            (contact) => contact.localId === weFoundIt
          );
          // console.log("hey");
          // console.log(setMostRecentChat);
          dispatch("chatWithContact", setMostRecentChat);
        }

        // End of Fetch messages
        state.areMessagesLoaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  chatWithContact({ commit, dispatch }, contact) {
    // Condition if empty chat
    console.log(contact);
    commit("storeUserMessageReceiver", contact);
    localStorage.setItem("userMessageReceiver", JSON.stringify(contact));

    // if (!state.contactMessages) {
    //   return;
    // }

    commit("emptyMessages");

    if (contact.messages) {
      commit("storeSelectedContactMessages", contact);
    }
    dispatch("switchToMessages");
    // dispatch("fetchContactMessages");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
