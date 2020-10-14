import Vue from "vue";
import Vuex from "vuex";
import chat from "./modules/chat";
import login from "./modules/login";
import signup from "./modules/signup";
import users from "./modules/users";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    chat,
    login,
    signup,
    users,
  },
});

export default store;
