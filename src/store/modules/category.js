const state = {
  category: "list-users",
  categoryLength: null,
};
const getters = {
  listCategoryType(state) {
    return state.category;
  },
  listCategoryTypeLength(state) {
    return state.categoryLength;
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
  switchToMessages(state) {
    state.category = "list-user-messages";
  },
  switchToNewContact(state) {
    state.category = "list-users";
  },
  switchListLength(state, listLength) {
    state.categoryLength = listLength;
  },
};
const actions = {
  switchToMessages({ commit, rootState }) {
    const messagesLength = rootState.users.contactMessages.length;
    commit("switchToMessages");
    commit("switchListLength", messagesLength);
  },
  switchToNewContact({ commit, rootState }) {
    commit("switchToNewContact");
    commit("switchListLength", rootState.users.users.length);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
