const state = {
  // messages: [],
  // activeChat: null,
  userMessages: [],
};

const getters = {
  userMessages(state) {
    return state.userMessages;
  },
};
const mutations = {
  storeMessage(state, messageObj) {
    const hasChatAlready = state.userMessages.some(
      (chatUser) => chatUser.receiver.localId === messageObj.receiver.localId
    );
    console.log(hasChatAlready);
    if (hasChatAlready) {
      state.userMessages = [messageObj];
    } else {
      state.userMessages.push(messageObj);
    }
  },
};
const actions = {
  storeMessage({ commit, rootState }, message) {
    const user = rootState.users.user;
    const contactUserChatWith = rootState.users.userMessageReceiver;
    const timestamp = new Date().getTime();

    const objTest = {
      sender: user,
      receiver: contactUserChatWith,
      timestamp: timestamp,
      message: message,
    };

    commit("storeMessage", objTest);

    /* 
        
        Separate messages is better

        @: When you store a message, you store the sender (rootState.user), receiver (rootState.userMessageReceiver), message_sent, timestamp
        State: store the messages as said in @
        Firebase: store the message as said in @
        DOM: 
          - take all the messages
          - sort them by timestamp
          - remove receiver duplicates

        */
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
