const state = {
  userChatContact: null,
  userChatContacts: [],
}

const getters = {
  userChatContact(state) {
    return state.userChatContact;
  },
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
  storeUserChatContact(state, receiver) {
    state.userChatContact = receiver;
  },
  storeUserChatContacts(state, payload) {
    state.userChatContacts = payload;
  },
  addUserContact({rootState}, newContact) {
    rootState.user.user.contacts.push(newContact);
    rootState.users.users = rootState.users.users.filter(
      (user) => user.localId !== newContact.localId
    );
  },
}

const actions = {
  chatWithContact({ commit }, contact) {
    localStorage.setItem("userChatContact", JSON.stringify(contact));
    commit("storeUserChatContact", contact);
    commit("emptyMessages");

    if (contact.messages) {
      commit("storeUserChatContactMessages", contact.messages);
    }
    commit("switchToUserMessages");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
