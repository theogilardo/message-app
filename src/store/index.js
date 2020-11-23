import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import users from "./modules/users";
import contact from "./modules/contact";
import contacts from "./modules/contacts";
import lists from "./modules/lists";
import messages from "./modules/messages";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    user,
    users,
    contact,
    contacts,
    lists,
    messages,
  },
});

export default store;
