import axios from "axios";

const state = {
  user: null,
  userChatContact: null,
  userChatContacts: [],
  users: [],
  componentKey: 0,
};

const getters = {
  user(state) {
    return state.user;
  },
  userChatContact(state) {
    return state.userChatContact;
  },
  userChatContacts(state) {
    return state.userChatContacts;
  },
  userChatContactsSorted(state) {
    return state.userChatContacts.sort(
      (a, b) => b.lastTimestamp - a.lastTimestamp
    );
  },
  users(state) {
    return state.users;
  },
  componentKey(state) {
    return state.componentKey;
  },
};

const mutations = {
  storeUser(state, userData) {
    state.user = userData;
  },
  storeUserChatContact(state, receiver) {
    state.userChatContact = receiver;
  },
  storeUserChatContacts(state, payload) {
    state.userChatContacts = payload;
  },
  addUserContact(state, newContact) {
    state.user.contacts.push(newContact);
    state.users = state.users.filter(
      (user) => user.localId !== newContact.localId
    );
  },
  storeUsers(state, userData) {
    state.users = userData;
  },
  forceRerender(state) {
    state.componentKey += 1;
  },
  storeLocalStorageUser(_, authData) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + authData.expiresIn * 1000);
    localStorage.setItem("tokenId", authData.tokenId);
    localStorage.setItem("userId", authData.localId);
    localStorage.setItem("userData", authData.userData);
    localStorage.setItem("expiresIn", expirationDate);
  },
};

const actions = {
  storeUser({ commit, dispatch }, authData) {
    axios
      .post("https://message-app-719f5.firebaseio.com/users.json", authData)
      .then((res) => {
        console.log(res);
        commit("storeUser", authData);
        dispatch("fetchUser");
      })
      .catch((err) => console.log(err));
  },

  fetchUser({ commit, dispatch, rootState }) {
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
          (user) => user.localId !== rootState.auth.userId
        );

        localStorage.setItem("storeUser", JSON.stringify(activeUser));
        localStorage.setItem("storeUsers", JSON.stringify(otherUsers));
        commit("storeUser", activeUser);
        commit("storeUsers", otherUsers);
        dispatch("fetchMessages");
      })
      .catch((err) => console.log(err));
  },

  chatWithContact({ commit }, contact) {
    localStorage.setItem("userChatContact", JSON.stringify(contact));
    commit("storeUserChatContact", contact);
    commit("emptyMessages");

    if (contact.messages) {
      commit("storeUserChatContactMessages", contact.messages);
    }
    commit("switchToUserMessages");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
