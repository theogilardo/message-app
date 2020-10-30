const state = {
  type: "list-users",
};

const getters = {
  listType(state) {
    return state.type;
  },
  listTypeLabel(state) {
    if (state.type === "list-user-messages") {
      return "Messages";
    }
    if (state.type === "list-users") {
      return "Find New Contact";
    }
  },
};
const mutations = {
  switchToUsers(state) {
    state.type = "list-users";
  },
  switchToUserMessages(state) {
    state.type = "list-user-messages";
  },
};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
