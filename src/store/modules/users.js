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
    // state.user.contacts = Object.assign(state.user.contacts, newContact);
    console.log(newContact);
    console.log(newContact.localId);
    const arrIds = state.users.map((user) => user.localId);
    console.log(arrIds);
    const test = state.users.find(
      (user) => user.localId === newContact.localId
    );
    console.log(test);
  },
  // removeContactFromUsers(state, newContact) {
  //   state.users = state.users.filter((user) => {
  //     user.localId !== newContact.localId;
  //   });
  // },
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
          activeUserContacts.push(contact);
        }
        console.log(activeUserContacts);

        const otherUsers = users.filter(
          (user) => rootState.auth.userId !== user.localId
        );
        console.log(otherUsers);

        const otherUsersNotInUserContacts = otherUsers.filter(
          (user) =>
            !activeUserContacts.some(
              (contact) => user.localId === contact.localId
            )
        );

        console.log(otherUsersNotInUserContacts);

        /*

        - Fetch all the right users for the current user
          cad not the main nor the ones that are in his contacts

        - When adding a new contact
          Add it to current user contacts in FB
          Remove from the DOM the contact

        */

        localStorage.setItem("storeUser", JSON.stringify(activeUser));
        commit("storeUser", activeUser);
        commit("storeUsers", otherUsersNotInUserContacts);
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
        // commit("removeContactFromUsers", newContact);
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
