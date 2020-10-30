import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import users from "./modules/users";
import category from "./modules/category";
import messages from "./modules/messages";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    users,
    category,
    messages,
  },
});

export default store;
