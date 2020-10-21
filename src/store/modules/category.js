const state = {
  category: "Contacts",
};
const getters = {
  listCategoryType(state) {
    return state.category;
  },
};
const mutations = {
  switchToContacts(state) {
    return (state.category = "Contacts");
  },
  switchToMessages(state) {
    return (state.category = "Messages");
  },
  switchToNewContact(state) {
    return (state.category = "Find New Contact");
  },
};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
