const state = {
  category: "contacts",
};
const getters = {
  listCategoryType(state) {
    return state.category;
  },
  listCategoryTypeLabel(state) {
    if (state.category === "contacts") {
      return "Contacts";
    }

    if (state.category === "messages") {
      return "Messages";
    }

    if (state.category === "findUsers") {
      return "Find New Contact";
    }
  },
};
const mutations = {
  switchToContacts(state) {
    return (state.category = "contacts");
  },
  switchToMessages(state) {
    return (state.category = "messages");
  },
  switchToNewContact(state) {
    return (state.category = "findUsers");
  },
};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
