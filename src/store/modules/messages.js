import axios from "axios";
import firebase from "firebase";

const state = {
  userChatContactMessages: [],
};
const getters = {
  userChatContactMessages(state) {
    return state.userChatContactMessages;
  },
};
const mutations = {
  storeUserChatContactMessages(state, userChatContactMessages) {
    state.userChatContactMessages = userChatContactMessages;
  },
  storeMessage(state, messageObj) {
    state.userChatContactMessages.push(messageObj);
  },
  emptyMessages(state) {
    state.userChatContactMessages = [];
  },
};
const actions = {
  storeMessage({ state, rootState, commit, dispatch }, message) {
    const timestamp = new Date().getTime();

    const messageObj = {
      senderId: rootState.users.user.localId,
      receiverId: rootState.users.userChatContact.localId,
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
        commit("switchToUserMessages");
      })
      .catch((err) => console.log(err));
  },

  fetchMessages({ rootState, commit, dispatch }) {
    axios
      .get("https://message-app-719f5.firebaseio.com/messages.json")
      .then((res) => {
        const data = res.data;
        const messages = [];
        for (let key in data) {
          const message = data[key];
          messages.push(message);
        }

        const userId = rootState.users.user.localId;

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
          const contactDataFromUsers = rootState.users.users.find(
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

        commit("storeUserChatContacts", userChatContacts);
        localStorage.setItem(
          "userChatContacts",
          JSON.stringify(userChatContacts)
        );

        if (
          !rootState.users.userChatContact &&
          rootState.users.userChatContacts.length
        ) {
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
};

export default {
  state,
  getters,
  mutations,
  actions,
};
