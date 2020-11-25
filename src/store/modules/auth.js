import axios from "axios";
import router from "../../router";

const state = {
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
  logout(state) {
    state.tokenId = null;
    localStorage.clear();
  },
};

const actions = {
  login({ commit, dispatch }, authData) {
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
        commit("storeUserLocalStorage", {
          tokenId: res.data.idToken,
          localId: res.data.localId,
          expiresIn: res.data.expiresIn,
        });

        commit("authUser", {
          tokenId: res.data.idToken,
          userId: res.data.localId,
        });
        dispatch("fetchUsers");
        dispatch("fetchMessages");

        // const recentChat = rootState.contact.contact.name
        // if (recentChat) {
        //   return router.push('/chat/' + recentChat)
        // }
        router.push("/chat");
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid email");
      });
  },

  signup({ commit, dispatch }, authData) {
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
        delete authData.email;
        delete authData.password;

        commit("storeUserLocalStorage", {
          tokenId: res.data.idToken,
          localId: res.data.localId,
          expiresIn: res.data.expiresIn,
          userData: authData,
        });

        commit("authUser", {
          tokenId: res.data.idToken,
          userId: res.data.localId,
        });

        authData.localId = res.data.localId;
        dispatch("storeUser", authData);
        dispatch("fetchUsers");

        router.replace("/chat");
      })
      .catch((error) => {
        console.log(error);
      });
  },

  autoLogin({ commit }) {
    const userId = localStorage.getItem("userId");
    const tokenId = localStorage.getItem("tokenId");
    const expirationDate = localStorage.getItem("expiresIn");
    const userData = localStorage.getItem("userData");
    const now = new Date();

    if (!tokenId && now >= expirationDate) {
      return;
    }

    commit("authUser", {
      tokenId,
      userId,
    });

    commit("storeUser", userData);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
