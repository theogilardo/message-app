import axios from "axios";

const state = {
  user: null,
  userId: null,
  tokenId: null,
};

const getters = {
  isAuth(state) {
    return state.tokenId !== null;
  },
};

const mutations = {
  authUser(state, authData) {
    state.tokenId = authData.tokenId;
    state.userId = authData.userId;
  },

  storeUser(state, userData) {
    state.user = userData;
  },

  storeLocalStorageAuthUser(_, authData) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + authData.expiresIn * 1000);
    localStorage.setItem("tokenId", authData.tokenId);
    localStorage.setItem("userId", authData.localId);
    localStorage.setItem("expiresIn", expirationDate);
  },

  logout(state) {
    state.tokenId = null;
    localStorage.clear();
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

        commit("storeLocalStorageAuthUser", {
          tokenId: res.data.idToken,
          localId: res.data.localId,
          expiresIn: res.data.expiresIn,
        });

        commit("authUser", {
          tokenId: res.data.idToken,
          userId: res.data.localId,
        });

        commit("storeUser", authData);
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

        commit("storeLocalStorageAuthUser", {
          tokenId: res.data.idToken,
          localId: res.data.localId,
          expiresIn: res.data.expiresIn,
        });

        commit("authUser", {
          tokenId: res.data.idToken,
          userId: res.data.localId,
        });

        commit("storeUser", authData);
      })
      .catch((error) => console.log(error));
  },

  autoLogin({ commit }) {
    const userId = localStorage.getItem("userId");
    const tokenId = localStorage.getItem("tokenId");
    const expirationDate = localStorage.getItem("expiresIn");
    const now = new Date();

    if (!tokenId && now >= expirationDate) {
      return;
    }

    commit("authUser", {
      tokenId,
      userId,
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
