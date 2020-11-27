import { axiosDatabaseFirebase } from "../../api/axios"

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
  storeUserLocalStorage(_, authData) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + authData.expiresIn * 1000);
    localStorage.setItem("tokenId", authData.tokenId);
    localStorage.setItem("userId", authData.localId);
    localStorage.setItem("expiresIn", expirationDate);

    if (authData.userData) { 
      localStorage.setItem("userData", authData.userData);
    }
  },
};

const actions = {
  storeUser({ commit, dispatch }, authData) {
    axiosDatabaseFirebase
      .post("/users.json", authData)
      .then((res) => {
        console.log(res);
        commit("storeUser", authData);
        dispatch("fetchUsers");
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
