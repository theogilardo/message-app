import axios from "axios";
import firebase from "firebase";

const state = {
  user: null,
  userMessageReceiver: null,
  users: [],
  messages: [],
  contactMessages: [],
  componentKey: 0,
  isDataFetched: false,
};

const getters = {
  user(state) {
    return state.user;
  },
  contactMessages(state) {
    return state.contactMessages;
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
  userContacts(state) {
    return state.user.contacts;
  },
  messages(state) {
    return state.messages;
  },
  users(state) {
    return state.users;
  },
};

const mutations = {
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
    state.messages.push(messageObj);
  },

  storeMessages(state, messageObj) {
    state.messages = messageObj;
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

  fetchUser({ state, commit, rootState }) {
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

        // if (activeUser.contacts) {
        //   const activeUserContacts = [];
        //   for (let key in activeUser.contacts) {
        //     const contact = activeUser.contacts[key];
        //     contact.contactKey = key;
        //     activeUserContacts.push(contact);
        //   }

        //   activeUser.contacts = activeUserContacts;
        //   const otherUsersNotInUserContacts = otherUsers.filter(
        //     (user) =>
        //       !activeUserContacts.some(
        //         (contact) => user.localId === contact.localId
        //       )
        //   );

        // if (state.messages.length) {
        // const findLastUserChat = activeUserContacts
        //   .filter((contact) => contact.lastMessage)
        //   .sort((a, b) => b.timestamp - a.timestamp)[0];
        // dispatch("chatWithContact", findLastUserChat);
        // }

        // commit("storeUsers", otherUsersNotInUserContacts);
        // } else {
        // activeUser.contacts = [];
        // }

        localStorage.setItem("storeUser", JSON.stringify(activeUser));
        commit("storeUser", activeUser);
        commit("storeUsers", otherUsers);

        state.isDataFetched = true;
      })
      .catch((err) => console.log(err));
  },

  storeMessage({ state, commit, dispatch }, message) {
    // dispatch("updateUserContact", message);

    const timestamp = new Date().getTime();

    const messageObj = {
      senderId: state.user.localId,
      receiverId: state.userMessageReceiver.localId,
      message: message,
      timestamp: timestamp,
    };

    commit("storeMessage", messageObj);

    firebase
      .database()
      .ref(`messages`)
      .push(messageObj)
      .then((res) => {
        console.log(res);
        dispatch("switchToMessages");
      })
      .catch((err) => console.log(err));
  },

  fetchMessages({ state, commit }) {
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
        const contactId = state.userMessageReceiver.localId;
        const conversation = [];

        const findContactUsers = messages
          .filter((message) => message.receiverId !== userId)
          .map((message) => message.receiverId);

        const contactMessages = [];

        findContactUsers.forEach((theContactId) => {
          const userMessage = state.users.find(
            (user) => user.localId === theContactId
          );
          contactMessages.push(userMessage);
        });

        const _ = require("lodash");
        const messageContactsLeft = _.uniq(contactMessages, "localId");

        messageContactsLeft.forEach((contact) => {
          const contactMessages = messages.filter(
            (message) =>
              message.receiverId === contact.localId ||
              message.senderId === contact.localId
          );

          contact.messages = contactMessages;
        });

        commit("storeMessageList", messageContactsLeft);

        const messageUsertoContact = messages.filter(
          (message) =>
            message.senderId === userId && message.receiverId === contactId
        );

        messageUsertoContact.forEach((message) => {
          return (message.type = "sent");
        });

        const messageContactToUser = messages.filter(
          (message) =>
            message.receiverId === userId && message.senderId === contactId
        );

        messageContactToUser.forEach((message) => {
          return (message.type = "received");
        });

        const concatChat = messageUsertoContact.concat(messageContactToUser);
        conversation.push(concatChat);

        const sortConversation = conversation[0].sort(
          (a, b) => a.timestamp - b.timestamp
        );

        commit("storeMessages", sortConversation);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  chatWithContact({ commit, dispatch }, contact) {
    commit("storeUserMessageReceiver", contact);
    dispatch("fetchMessages");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
