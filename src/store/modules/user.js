import axios from "axios";

const state = {
  user: null,
};

const getters = {
  user(state) {
    return state.user;
  },
};

const mutations = {
  storeUser(state, userData) {
    state.user = userData;
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
    axios
      .post("https://message-app-719f5.firebaseio.com/users.json", authData)
      .then((res) => {
        console.log(res);
        commit("storeUser", authData);
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
