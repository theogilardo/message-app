import axios from "axios";

const state = {
  user: null,
  idToken: null,
};

const getters = {
  isAuth(state) {
    return state.idToken !== null;
  },
};

const mutations = {
  storeUser(state, userData) {
    state.user = userData;
  },

  storeIdToken(state, idToken) {
    state.idToken = idToken;
  },

  logout(state) {
    state.idToken = null;
  },
};

const actions = {
  login({ commit }, authData) {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGkv9-83v6LsQRhClROTowTL6rK5YcPI8",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        console.log(res);
        authData.userId = res.data.localId;
        commit("storeUser", authData);
        commit("storeIdToken", res.data.idToken);
      })
      .catch((error) => console.log(error));
  },

  signup({ commit }, authData) {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGkv9-83v6LsQRhClROTowTL6rK5YcPI8",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        console.log(res);
        authData.userId = res.data.localId;
        commit("storeUser", authData);
        commit("storeIdToken", res.data.idToken);
      })
      .catch((error) => console.log(error));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
