import axios from "axios";
import firebase from "firebase";

const state = {
  user: null,
  userMessageReceiver: null,
  users: [],
  messages: null,
};

const getters = {
  user(state) {
    return state.user;
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
  storeMessage(state, message) {
    // Refactor with mixin
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hour}:${minutes}`;

    state.user.contacts.forEach((contact) => {
      if (contact.localId === state.userMessageReceiver.localId) {
        contact.lastMessage = message;
        contact.lastMessageTimeSent = time;
      }
    });
  },

  storeMessages(state, messageObj) {
    state.messages = messageObj;
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

  fetchUser({ commit, rootState }) {
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

        const activeUserContacts = [];
        for (let key in activeUser.contacts) {
          const contact = activeUser.contacts[key];
          contact.contactKey = key;
          activeUserContacts.push(contact);
        }

        activeUser.contacts = activeUserContacts;

        const otherUsers = users.filter(
          (user) => rootState.auth.userId !== user.localId
        );

        const otherUsersNotInUserContacts = otherUsers.filter(
          (user) =>
            !activeUserContacts.some(
              (contact) => user.localId === contact.localId
            )
        );

        localStorage.setItem("storeUser", JSON.stringify(activeUser));
        commit("storeUser", activeUser);
        commit("storeUsers", otherUsersNotInUserContacts);
      })
      .catch((err) => console.log(err));
  },

  addContact({ commit, rootState }, newContact) {
    const keyCurrentUSer = rootState.users.user.key;
    console.log(newContact);
    firebase
      .database()
      .ref(`users/${keyCurrentUSer}/contacts`)
      .push(newContact)
      .then((res) => {
        newContact.key = res.key;
        commit("addUserContact", newContact);
      })
      .catch((err) => console.log(err));
  },

  storeMessage({ state, commit }, message) {
    commit("switchToMessages");
    commit("storeMessage", message);

    const timestamp = new Date().getTime();

    const messageObj = {
      senderId: state.user.localId,
      receiverId: state.userMessageReceiver.localId,
      message: message,
      timestamp: timestamp,
    };

    firebase
      .database()
      .ref(`messages`)
      .push(messageObj)
      .then((res) => {
        console.log(res);
        // messageObj.key = res.key;
        // commit("addChatContact", objTest);
        // commit("switchToMessages");
      })
      .catch((err) => console.log(err));
  },

  fetchMessages({ commit }) {
    axios
      .get("https://message-app-719f5.firebaseio.com/messages.json")
      .then((res) => {
        console.log(res);
        const data = res.data;
        const messages = [];
        for (let key in data) {
          const message = data[key];
          messages.push(message);
        }
        commit("storeMessages", messages);
      })
      .catch((err) => console.log(err));
  },

  chatWithContact({ commit }, contact) {
    commit("storeUserMessageReceiver", contact);

    // const keyCurrentUser = state.user.key;
    // const keyChatUser = state.userMessageReceiver.key;

    // console.log(keyCurrentUser);
    // console.log(keyChatUser);

    // const hasChat = true;

    // firebase
    //   .database()
    //   .ref(`users/${keyCurrentUser}/contacts/${keyChatUser}`)
    //   .push(hasChat)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
