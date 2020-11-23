const state = {
  userChatContacts: [],
}

const getters = {
  userChatContacts(state) {
    return state.userChatContacts;
  },
  userChatContactsSorted(state) {
    return state.userChatContacts.sort(
      (a, b) => b.lastTimestamp - a.lastTimestamp
    );
  },
}

const mutations = {
  storeUserChatContacts(state, payload) {
    state.userChatContacts = payload;
  },
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions,
};
