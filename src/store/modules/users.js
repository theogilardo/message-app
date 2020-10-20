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
    state.user.contacts = Object.assign(state.user.contacts, newContact);
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

        const otherUsers = users.filter((user) => {
          return rootState.auth.userId !== user.localId;
        });

        localStorage.setItem("storeUser", JSON.stringify(activeUser));
        commit("storeUser", activeUser);
        commit("storeUsers", otherUsers);
      })
      .catch((err) => console.log(err));
  },

  addContact({ commit, rootState }, newContact) {
    const keyCurrentUSer = rootState.users.user.key;

    firebase
      .database()
      .ref(`users/${keyCurrentUSer}/contacts`)
      .push(newContact)
      .then((res) => {
        const newContactObj = {};
        newContactObj[res.key] = newContact;
        commit("addUserContact", newContactObj);
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
