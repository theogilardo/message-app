import firebase from "firebase";
import router from "../../router";

const state = {
  contactMessages: [],
};
const getters = {
  contactMessages(state) {
    return state.contactMessages;
  },
};
const mutations = {
  storeContactMessages(state, contactMessages) {
    state.contactMessages = contactMessages;
  },
  storeMessage(state, messageObj) {
    state.contactMessages.push(messageObj);
  },
  emptyMessages(state) {
    state.contactMessages = [];
  },
};
const actions = {
  storeMessage({ state, rootState, commit, dispatch }, message) {
    const timestamp = new Date().getTime();

    const messageFormatted = {
      senderId: rootState.user.user.localId,
      receiverId: rootState.contact.contact.localId,
      message: message,
      timestamp: timestamp,
    };

    const messageSent = messageFormatted;
    messageSent.type = "sent";
    commit("storeMessage", messageSent);

    localStorage.setItem(
      "contactMessages",
      JSON.stringify(state.contactMessages)
    );

    firebase
      .database()
      .ref(`messages`)
      .push(messageFormatted)
      .then((res) => {
        console.log(res);
        dispatch("fetchMessages");
        commit("switchToUserMessages");
      })
      .catch((err) => console.log(err));
  },

  fetchMessages({ rootState, commit, dispatch }) {
    firebase
      .database()
      .ref("messages")
      .on("value", (snapshot) => {
        const messages = [];
        const data = snapshot.val();
        for (let key in data) {
          const message = data[key];
          messages.push(message);
        }        

        const userId = rootState.user.user.localId;
        const _ = require("lodash");

        // Find all user chat contacts IDs from the messages in Firebase
        const findContacts = messages
          .filter(
            (message) =>
              message.receiverId === userId || message.senderId === userId
          )
          .map((message) => {
            const contactId =
              message.senderId === userId
                ? message.receiverId
                : message.senderId;
            return contactId;
          });

        // router.replace("/chat");
    
        if (findContacts.length) {
          const uniqueContactsIds = _.uniq(
            findContacts,
            "localId"
          ).filter((id) => id !== userId);

          const contacts = [];

          // Store data from users to the chat contact found
          uniqueContactsIds.forEach((contactId) => {
            const contactDataFromUsers = rootState.users.users.find(
              (user) => user.localId === contactId
            );
            contacts.push(contactDataFromUsers);
          });

          // Store and format the messages for each user chat contact
          contacts.forEach((contact) => {
            const contactMessages = messages.filter(
              (message) =>
                (message.receiverId === contact.localId &&
                  message.senderId === userId) ||
                (message.receiverId === userId &&
                  message.senderId === contact.localId)
            );

            const messageUsertoContact = contactMessages.filter(
              (message) => message.senderId === userId
            );

            messageUsertoContact.forEach((message) => (message.type = "sent"));

            const messageContactToUser = contactMessages.filter(
              (message) => message.receiverId === userId
            );

            messageContactToUser.forEach(
              (message) => (message.type = "received")
            );

            const contactMessagesFormatted = messageUsertoContact.concat(
              messageContactToUser
            );

            contact.messages = contactMessagesFormatted.sort(
              (a, b) => b.timestamp - a.timestamp
            );

            const lastTimestamp = contactMessagesFormatted.sort(
              (a, b) => a.timestamp - b.timestamp
            );

            contact.lastTimestamp =
              lastTimestamp[lastTimestamp.length - 1].timestamp;
          });

          commit("storeContacts", contacts);
          localStorage.setItem(
            "contacts",
            JSON.stringify(contacts)
          );

          // Redirect to last chat when user login
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

          const setMostRecentChat = contacts.find(
            (contact) => contact.localId === contactId
          );
          dispatch("chatWithContact", setMostRecentChat);

          if (rootState.auth.initLogin) {
            const linkRecentChat = setMostRecentChat.name
            router.push('/chat/' + linkRecentChat)
            rootState.auth.initLogin = false
          }
        }

        if (rootState.auth.initLogin) {
          router.push("/chat");
          rootState.auth.initLogin = false
        }

      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
