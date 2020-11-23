const state = {
  userChatContact: null,
};

const getters = {
  userChatContact(state) {
    return state.userChatContact;
  },
};

const mutations = {
  storeUserChatContact(state, receiver) {
    state.userChatContact = receiver;
  },
};

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
