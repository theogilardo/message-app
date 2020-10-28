const state = {
  category: "findUsers",
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
    state.category = "contacts";
  },
  switchToMessages(state) {
    state.category = "messages";
  },
  switchToNewContact(state) {
    state.category = "findUsers";
  },
  switchListLength(state, listLength) {
    state.categoryLength = listLength;
  },
};
const actions = {
  switchToContacts({ commit, rootState }) {
    commit("switchToContacts");
    commit("switchListLength", rootState.users.user.contacts.length);
  },
  switchToMessages({ commit, dispatch, rootState }) {
    dispatch("fetchContactMessages");
    dispatch("fetchMessages");
    commit("switchToMessages");

    // const findLastUserChat = rootState.users.user.contacts
    //   .filter((contact) => contact.lastMessage)
    //   .sort((a, b) => b.timestamp - a.timestamp)[0];
    // dispatch("chatWithContact", findLastUserChat);

    const messagesLength = rootState.users.contactMessages.length;
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
