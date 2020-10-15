import Vue from "vue";
import Vuex from "vuex";
import chat from "./modules/chat";
import auth from "./modules/auth";
import users from "./modules/users";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    chat,
    auth,
    users,
  },
});

export default store;
