const state = {
  category: "contacts",
};
const getters = {
  listCategoryType(state) {
    return state.category;
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
