import axios from "axios";
import firebase from "firebase";

const state = {
  user: null,
  userMessageReceiver: null,
  users: [],
  messages: [],
  componentKey: 0,
};

const getters = {
  user(state) {
    return state.user;
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
  updateUserContact(state, message) {
    const timestamp = new Date().getTime();

    state.user.contacts.forEach((contact) => {
      if (contact.localId === state.userMessageReceiver.localId) {
        contact.lastMessage = message;
        contact.timestamp = timestamp;
      }
    });
  },
};

const actions = {
  storeUser({ commit }, authData) {
    axios
      .post("https://message-app-719f5.firebaseio.com/users.json", authData)
      .then((res) => {
        const key = res.data.name;
        authData.key = key;
        commit("storeUser", authData);
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

        console.log(users);

        const activeUser = users.find((user) => {
          return user.localId === rootState.auth.userId;
        });

        const otherUsers = users.filter(
          (user) => rootState.auth.userId !== user.localId
        );

        console.log(activeUser);

        // Only if the user has contacts: check for contact length
        if (activeUser.contacts) {
          const activeUserContacts = [];
          for (let key in activeUser.contacts) {
            const contact = activeUser.contacts[key];
            contact.contactKey = key;
            activeUserContacts.push(contact);
          }

          activeUser.contacts = activeUserContacts;
          const otherUsersNotInUserContacts = otherUsers.filter(
            (user) =>
              !activeUserContacts.some(
                (contact) => user.localId === contact.localId
              )
          );

          // Only if the user has messages: check for messages length
          if (state.messages.length) {
            const findLastUserChat = activeUserContacts
              .filter((contact) => contact.lastMessage)
              .sort((a, b) => b.timestamp - a.timestamp)[0];
            dispatch("chatWithContact", findLastUserChat);
          }

          commit("storeUsers", otherUsersNotInUserContacts);
        } else {
          activeUser.contacts = [];
          commit("storeUsers", otherUsers);
        }

        localStorage.setItem("storeUser", JSON.stringify(activeUser));
        commit("storeUser", activeUser);
      })
      .catch((err) => console.log(err));
  },

  addContact({ state, commit }, newContact) {
    const keyCurrentUSer = state.user.key;
    commit("addUserContact", newContact);
    commit("switchListLength", state.users.length);

    firebase
      .database()
      .ref(`users/${keyCurrentUSer}/contacts`)
      .push(newContact)
      .then((res) => {
        newContact.newContactKey = res.key;
        console.log(newContact);
        console.log(res.key);

        const newObj = newContact;

        firebase
          .database()
          .ref(`users/${keyCurrentUSer}/contacts/${res.key}`)
          .set(newObj)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },

  updateUserContact({ state, commit }, message) {
    commit("updateUserContact", message);

    const userKey = state.user.key;
    const contactKey = state.userMessageReceiver.newContactKey;
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const time = `${hours}:${minutes}`;
    const updatedUserContact = state.userMessageReceiver;
    updatedUserContact.lastMessage = message;
    updatedUserContact.time = time;

    firebase
      .database()
      .ref(`users/${userKey}/contacts/${contactKey}`)
      .set(updatedUserContact)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  },

  storeMessage({ state, commit, dispatch }, message) {
    dispatch("updateUserContact", message);

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

        const messageUsertoContact = messages.filter(
          (message) =>
            message.senderId === userId && message.receiverId === contactId
        );

        const messageContactToUser = messages.filter(
          (message) =>
            message.receiverId === userId && message.senderId === contactId
        );

        const concatChat = messageUsertoContact.concat(messageContactToUser);
        conversation.push(concatChat);

        const sortConversation = conversation[0].sort(
          (a, b) => a.timestamp - b.timestamp
        );

        commit("storeMessages", sortConversation);
      })
      .catch((err) => {
        console.log(err);
        // alert("You don't have any messages yet!");
      });
  },

  chatWithContact({ commit, dispatch }, contact) {
    commit("storeUserMessageReceiver", contact);
    dispatch("switchToMessages");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
