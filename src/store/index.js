import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import users from "./modules/users";
import list from "./modules/list";
import messages from "./modules/messages";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    users,
    list,
    messages,
  },
});

export default store;
