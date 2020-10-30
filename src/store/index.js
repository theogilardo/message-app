import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import users from "./modules/users";
import lists from "./modules/lists";
import messages from "./modules/messages";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    users,
    lists,
    messages,
  },
});

export default store;
