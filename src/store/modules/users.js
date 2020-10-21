import axios from "axios";
import firebase from "firebase";

const state = {
  user: null,
  users: [],
};

const getters = {
  user(state) {
    return state.user;
  },
  userContacts(state) {
    return state.user.contacts;
  },
  userMessages(state) {
    return state.user.messages;
  },
  users(state) {
    return state.users;
  },
};

const mutations = {
  storeUser(state, userData) {
    state.user = userData;
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
  addChatContact(state, chatContact) {
    state.user.messages = chatContact;
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

  chatWithContact({ commit, rootState }, contact) {
    const keyCurrentUSer = rootState.users.user.key;
    console.log(contact);

    // Remove user from contacts

    const objTest = {
      senderId: rootState.users.user.localId,
      senderName: rootState.users.user.name,
      receiverId: contact.localId,
      receiverName: contact.name,
      message: "Hello",
    };

    // Add user to user messages in DB
    firebase
      .database()
      .ref(`users/${keyCurrentUSer}/messages`)
      .push(objTest)
      .then((res) => {
        objTest.key = res.key;
        // Add user to user messages in State
        // const messages = [];

        commit("addChatContact", contact);
        commit("switchToMessages");
      })
      .catch((err) => console.log(err));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
