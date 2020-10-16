import axios from "axios";

const state = {
  user: null,
  users: null,
  userId: null,
  tokenId: null,
};

const getters = {
  isAuth(state) {
    return state.tokenId !== null;
  },
  user(state) {
    return state.user;
  },
  users(state) {
    return state.users;
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

  storeUsers(state, userData) {
    state.users = userData;
  },

  storeLocalStorageAuthUser(_, authData) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + authData.expiresIn * 1000);
    localStorage.setItem("tokenId", authData.tokenId);
    localStorage.setItem("userId", authData.localId);
    localStorage.setItem("userData", authData.userData);
    localStorage.setItem("expiresIn", expirationDate);
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
        commit("storeLocalStorageAuthUser", {
          tokenId: res.data.idToken,
          localId: res.data.localId,
          expiresIn: res.data.expiresIn,
        });

        commit("authUser", {
          tokenId: res.data.idToken,
          userId: res.data.localId,
        });

        // commit("storeUser", authData);
        dispatch("fetchUser", authData);
      })
      .catch((error) => console.log(error));
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
        console.log(res);
        console.log(res.localId);
        console.log(authData);

        authData.localId = res.data.localId;
        console.log(authData);

        commit("storeLocalStorageAuthUser", {
          tokenId: res.data.idToken,
          localId: res.data.localId,
          expiresIn: res.data.expiresIn,
          userData: authData,
        });

        commit("authUser", {
          tokenId: res.data.idToken,
          userId: res.data.localId,
        });

        dispatch("storeUser", authData);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  storeUser({ commit }, authData) {
    commit("storeUser", authData);
    // Store in firebase user Data
    axios
      .post("https://message-app-719f5.firebaseio.com/users.json", authData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },

  fetchUser({ commit, state }) {
    axios
      .get(
        "https://message-app-719f5.firebaseio.com/users.json" +
          "?auth=" +
          state.tokenId
      )
      .then((res) => {
        const data = res.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          users.push(user);
        }

        const activeUser = users.find((user) => {
          return user.localId === state.userId;
        });

        console.log(activeUser);

        const otherUsers = users.filter((user) => {
          return state.userId !== user.localId;
        });

        console.log(otherUsers);

        commit("storeUsers", otherUsers);
        commit("storeUser", activeUser);
      })
      .catch((err) => console.log(err));
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
