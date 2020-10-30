const state = {
  category: "list-users",
};
const getters = {
  listCategoryType(state) {
    return state.category;
  },
  listCategoryTypeLabel(state) {
    if (state.category === "list-user-messages") {
      return "Messages";
    }
    if (state.category === "list-users") {
      return "Find New Contact";
    }
  },
};
const mutations = {
  switchToUsers(state) {
    state.category = "list-users";
  },
  switchToUserMessages(state) {
    state.category = "list-user-messages";
  },
};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
