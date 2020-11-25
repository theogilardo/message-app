const state = {
  contact: null,
};

const getters = {
  contact(state) {
    return state.contact;
  },
};

const mutations = {
  storeContact(state, receiver) {
    state.contact = receiver;
  },
};

const actions = {
  chatWithContact({ commit, rootState }, contact) {
    localStorage.setItem("contact", JSON.stringify(contact));
    commit("storeContact", contact);
    commit("emptyMessages");
    
    if (contact.messages) {
      commit("storeContactMessages", contact.messages);
    } 
  
    const findUserContact = rootState.contacts.contacts.find(userContact => userContact.localId === contact.localId )
   
    if (findUserContact) {
      commit("storeContactMessages", findUserContact.messages);
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
