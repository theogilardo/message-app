import axios from "axios";

const state = {
  users: [],
}

const getters = {
  users(state) {
    return state.users;
  },
}

const mutations = {
  storeUsers(state, userData) {
    state.users = userData;
  },
}

const actions = {
  fetchUsers({ commit, rootState }) {
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
      })
      .catch((err) => console.log(err));
  },
}

export default {
  state, 
  getters, 
  mutations,
  actions
}