// import axios from "axios";
import firebase from "firebase";

const state = {
  userChatContactMessages: [],
  messagesLoaded: false,
};
const getters = {
  // NOT UPDATED
  userChatContactMessages(state) {
    return state.userChatContactMessages;
  },
  messagesLoaded(state) {
    return state.messagesLoaded;
  },
};
const mutations = {
  storeUserChatContactMessages(state, userChatContactMessages) {
    state.userChatContactMessages = userChatContactMessages;
  },
  emptyMessages(state) {
    state.userChatContactMessages = [];
  },
  storeMessage(state, messageObj) {
    state.userChatContactMessages.push(messageObj);
  },
  messagesLoadedTrue(state) {
    state.messagesLoaded = true;
  },
};
const actions = {
  // databaseUpdated({ state,  })

  storeMessage({ state, rootState, commit, dispatch }, message) {
    const timestamp = new Date().getTime();

    const messageFormatted = {
      senderId: rootState.users.user.localId,
      receiverId: rootState.users.userChatContact.localId,
      message: message,
      timestamp: timestamp,
    };

    firebase
      .database()
      .ref(`messages`)
      .push(messageFormatted)
      .then((res) => {
        console.log(res);
        // dispatch("fetchMessages");
        commit("switchToUserMessages");
      })
      .catch((err) => console.log(err));

    const messageSent = messageFormatted;

    messageSent.type = "sent";
    commit("storeMessage", messageSent);

    localStorage.setItem(
      "userChatContactMessages",
      JSON.stringify(state.userChatContactMessages)
    );
  },

  fetchMessages({ rootState, commit, dispatch }) {
    const messages = [];

    firebase
      .database()
      .ref("messages")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
          const message = data[key];
          messages.push(message);
        }

        const userId = rootState.users.user.localId;
        const _ = require("lodash");

        // Find all user chat contacts IDs from the messages in Firebase
        const findUserChatContacts = messages
          .filter(
            (message) =>
              message.receiverId === userId || message.senderId === userId
          )
          .map((message) => {
            const userChatContactId =
              message.senderId === userId
                ? message.receiverId
                : message.senderId;
            return userChatContactId;
          });

        const uniqueUserChatContactsIds = _.uniq(
          findUserChatContacts,
          "localId"
        ).filter((id) => id !== userId);

        const userChatContacts = [];

        // Store data from users to the chat contact found
        uniqueUserChatContactsIds.forEach((contactId) => {
          const contactDataFromUsers = rootState.users.users.find(
            (user) => user.localId === contactId
          );
          userChatContacts.push(contactDataFromUsers);
        });

        // Store and format the messages for each user chat contact
        userChatContacts.forEach((contact) => {
          const userChatContactMessages = messages.filter(
            (message) =>
              (message.receiverId === contact.localId &&
                message.senderId === userId) ||
              (message.receiverId === userId &&
                message.senderId === contact.localId)
          );

          const messageUsertoContact = userChatContactMessages.filter(
            (message) => message.senderId === userId
          );

          messageUsertoContact.forEach((message) => (message.type = "sent"));

          const messageContactToUser = userChatContactMessages.filter(
            (message) => message.receiverId === userId
          );

          messageContactToUser.forEach(
            (message) => (message.type = "received")
          );

          const userChatContactMessagesFormatted = messageUsertoContact.concat(
            messageContactToUser
          );

          contact.messages = userChatContactMessagesFormatted.sort(
            (a, b) => b.timestamp - a.timestamp
          );

          const lastTimestamp = userChatContactMessagesFormatted.sort(
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

        // Redirect to last chat when user login

        // Set active to the current user chat to apply this too
        // if (
        //   !rootState.users.userChatContact &&
        //   rootState.users.userChatContacts.length
        // ) {
        // Find last user message
        const findLastUserMessage = messages.filter(
          (message) =>
            message.receiverId === userId || message.senderId === userId
        );

        const lastUserMessage =
          findLastUserMessage[findLastUserMessage.length - 1];

        const contactId =
          lastUserMessage.senderId === userId
            ? lastUserMessage.receiverId
            : lastUserMessage.senderId;

        const setMostRecentChat = userChatContacts.find(
          (contact) => contact.localId === contactId
        );
        dispatch("chatWithContact", setMostRecentChat);
        state.messagesLoaded = true;
        // }
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
