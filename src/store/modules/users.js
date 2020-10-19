import axios from "axios";

const state = {
  user: null,
  users: null,
};

const getters = {
  user(state) {
    return state.user;
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
};

const actions = {
  storeUser({ commit }, authData) {
    commit("storeUser", authData);
    axios
      .post("https://message-app-719f5.firebaseio.com/users.json", authData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },

  // addContact({ commit }, contactData) {
  //   commit("storeNewContact", contactData)
  //   axios.post("https://message-app-719f5.firebaseio.com/contacts.json", authData)
  // },

  fetchUser({ commit, rootState }) {
    axios
      .get("https://message-app-719f5.firebaseio.com/users.json")
      .then((res) => {
        const data = res.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          users.push(user);
        }

        const activeUser = users.find((user) => {
          return user.localId === rootState.auth.userId;
        });

        const otherUsers = users.filter((user) => {
          return rootState.auth.userId !== user.localId;
        });
        localStorage.setItem("storeUser", JSON.stringify(activeUser));
        commit("storeUsers", otherUsers);
        commit("storeUser", activeUser);
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
