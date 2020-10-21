const state = {
  category: "Contacts",
  listCategory: "",
};
const getters = {
  listCategoryType(state) {
    return state.category;
  },
  listCategory(state) {
    state.listCategory;
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
  updateListLength(state, listCategory) {
    state.listCategory = listCategory;
  },
};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
