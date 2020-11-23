const state = {
  contacts: [],
}

const getters = {
  contacts(state) {
    return state.contacts;
  },
  contactsSorted(state) {
    return state.contacts.sort(
      (a, b) => b.lastTimestamp - a.lastTimestamp
    );
  },
}

const mutations = {
  storeContacts(state, payload) {
    state.contacts = payload;
  },
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions,
};
