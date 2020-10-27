import axios from "axios";
import firebase from "firebase";

const state = {
  user: null,
  userMessageReceiver: null,
  users: [],
  messages: [],
  contactMessages: [],
  componentKey: 0,
  isDataFetched: false,
};

const getters = {
  user(state) {
    return state.user;
  },
  contactMessages(state) {
    return state.contactMessages;
  },
  isDataFetched(state) {
    return state.isDataFetched;
  },
  componentKey(state) {
    return state.componentKey;
  },
  userMessageReceiver(state) {
    return state.userMessageReceiver;
  },
  userContacts(state) {
    return state.user.contacts;
  },
  messages(state) {
    return state.messages;
  },
  users(state) {
    return state.users;
  },
};

const mutations = {
  storeUser(state, userData) {
    state.user = userData;
  },

  storeMessageList(state, payload) {
    state.contactMessages = payload;
  },

  forceRerender(state) {
    state.componentKey += 1;
  },

  storeUserMessageReceiver(state, receiver) {
    state.userMessageReceiver = receiver;
  },

  storeUsers(state, userData) {
    state.users = userData;
  },

  storeLocalStorageUser(_, authData) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + authData.expiresIn * 1000);
    localStorage.setItem("tokenId", authData.tokenId);
    localStorage.setItem("userId", authData.localId);
    localStorage.setItem("userData", authData.userData);
    localStorage.setItem("expiresIn", expirationDate);
  },

  addUserContact(state, newContact) {
    state.user.contacts.push(newContact);
    state.users = state.users.filter(
      (user) => user.localId !== newContact.localId
    );
  },
  storeMessage(state, messageObj) {
    state.messages.push(messageObj);
  },

  storeMessages(state, messageObj) {
    state.messages = messageObj;
  },
  // updateUserContact(state, message) {
  //   const timestamp = new Date().getTime();

  //   state.user.contacts.forEach((contact) => {
  //     if (contact.localId === state.userMessageReceiver.localId) {
  //       contact.lastMessage = message;
  //       contact.timestamp = timestamp;
  //     }
  //   });
  // },
};

const actions = {
  storeUser({ commit, dispatch }, authData) {
    axios
      .post("https://message-app-719f5.firebaseio.com/users.json", authData)
      .then((res) => {
        const key = res.data.name;
        authData.key = key;
        commit("storeUser", authData);
        dispatch("fetchUser");
      })
      .catch((err) => console.log(err));
  },

  fetchUser({ state, commit, rootState }) {
    axios
      .get("https://message-app-719f5.firebaseio.com/users.json")
      .then((res) => {
        console.log(res);
        const data = res.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          user.key = key;
          users.push(user);
        }

        const activeUser = users.find((user) => {
          return user.localId === rootState.auth.userId;
        });

        const otherUsers = users.filter(
          (user) => rootState.auth.userId !== user.localId
        );

        // if (activeUser.contacts) {
        //   const activeUserContacts = [];
        //   for (let key in activeUser.contacts) {
        //     const contact = activeUser.contacts[key];
        //     contact.contactKey = key;
        //     activeUserContacts.push(contact);
        //   }

        //   activeUser.contacts = activeUserContacts;
        //   const otherUsersNotInUserContacts = otherUsers.filter(
        //     (user) =>
        //       !activeUserContacts.some(
        //         (contact) => user.localId === contact.localId
        //       )
        //   );

        // if (state.messages.length) {
        // const findLastUserChat = activeUserContacts
        //   .filter((contact) => contact.lastMessage)
        //   .sort((a, b) => b.timestamp - a.timestamp)[0];
        // dispatch("chatWithContact", findLastUserChat);
        // }

        // commit("storeUsers", otherUsersNotInUserContacts);
        // } else {
        // activeUser.contacts = [];
        // }

        localStorage.setItem("storeUser", JSON.stringify(activeUser));
        commit("storeUser", activeUser);
        commit("storeUsers", otherUsers);

        state.isDataFetched = true;
      })
      .catch((err) => console.log(err));
  },

  addContact({ state, commit }, newContact) {
    const keyCurrentUSer = state.user.key;
    commit("addUserContact", newContact);
    commit("switchListLength", state.users.length);

    firebase
      .database()
      .ref(`users/${keyCurrentUSer}/contacts`)
      .push(newContact)
      .then((res) => {
        newContact.newContactKey = res.key;

        const newObj = newContact;

        firebase
          .database()
          .ref(`users/${keyCurrentUSer}/contacts/${res.key}`)
          .set(newObj)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },

  // updateUserContact({ state, commit }, message) {
  //   commit("updateUserContact", message);

  //   const userKey = state.user.key;
  //   const contactKey = state.userMessageReceiver.newContactKey;
  //   const date = new Date();
  //   const minutes = date.getMinutes();
  //   const hours = date.getHours();
  //   const time = `${hours}:${minutes}`;
  //   const updatedUserContact = state.userMessageReceiver;
  //   updatedUserContact.lastMessage = message;
  //   updatedUserContact.time = time;

  //   firebase
  //     .database()
  //     .ref(`users/${userKey}/contacts/${contactKey}`)
  //     .set(updatedUserContact)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // },

  storeMessage({ state, commit, dispatch }, message) {
    // dispatch("updateUserContact", message);

    const timestamp = new Date().getTime();

    const messageObj = {
      senderId: state.user.localId,
      receiverId: state.userMessageReceiver.localId,
      message: message,
      timestamp: timestamp,
    };

    commit("storeMessage", messageObj);

    firebase
      .database()
      .ref(`messages`)
      .push(messageObj)
      .then((res) => {
        console.log(res);
        dispatch("switchToMessages");
      })
      .catch((err) => console.log(err));
  },

  fetchMessages({ state, commit }) {
    axios
      .get("https://message-app-719f5.firebaseio.com/messages.json")
      .then((res) => {
        const data = res.data;
        const messages = [];
        for (let key in data) {
          const message = data[key];
          messages.push(message);
        }

        const userId = state.user.localId;
        const contactId = state.userMessageReceiver.localId;
        const conversation = [];

        console.log(messages);

        // 6. Fetch all messages
        // 7. Build list of contacts with Messages
        //     1. Take all the messages available + 2. Filter the one including the main user

        const userReceivedMessages = messages.filter(
          (message) =>
            message.receiverId === userId || message.senderId === userId
        );
        console.log(userReceivedMessages);

        //     3. Build array with each contact in it (name, surname and array of related messages with current user ->> last message of the array is displayed)
        // .a Go to users and find
        const findContactUsers = messages
          .filter((message) => message.receiverId !== userId)
          .map((message) => message.receiverId);

        console.log(findContactUsers);

        const contactMessages = [];

        findContactUsers.forEach((theContactId) => {
          const userMessage = state.users.find(
            (user) => user.localId === theContactId
          );
          contactMessages.push(userMessage);
        });

        const _ = require("lodash");
        const messageContactsLeft = _.uniq(contactMessages, "localId");

        console.log(messageContactsLeft);

        messageContactsLeft.forEach((contact) => {
          const contactMessages = messages.filter(
            (message) =>
              message.receiverId === contact.localId ||
              message.senderId === contact.localId
          );

          contact.messages = contactMessages;
        });

        console.log(messageContactsLeft);

        commit("storeMessageList", messageContactsLeft);

        // contactMessages.forEach(contact => {
        //   contact.messages = userReceivedMessages
        // })

        /*
          contactMessages = [
            {
              name: "Theo",
              surname: "Gilardo",
              messages: {
                {
                  receiverId: "FERFZE9343223",
                  senderId: "MMDZRER0323423932",
                  message: "Hey man!",
                  timestamp: "16590543"
                }
                {
                  receiverId: "PAZOEZAR343",
                  senderId: "MMDZRER0323423932",
                  message: "Really?",
                  timestamp: "16453454"
                }

              }
            }
            {
              name: "Bill",
              surname: "Callahan",
              messages: {
                {
                  receiverId: "FERFZE9343223",
                  senderId: "MMDZRER0323423932",
                  message: "Hey man!",
                  timestamp: "16590543"
                }
                {
                  receiverId: "PAZOEZAR343",
                  senderId: "MMDZRER0323423932",
                  message: "Really?",
                  timestamp: "16453454"
                }

              }
            }

          ]



        */

        // 8. Redirect to the current one = messageReceiver and retrieve its array of messages

        // const UserSentMessages = messages.filter(
        //   (message) => message.senderId === userId
        // );
        // console.log(UserSentMessages);

        const messageUsertoContact = messages.filter(
          (message) =>
            message.senderId === userId && message.receiverId === contactId
        );

        messageUsertoContact.forEach((message) => {
          return (message.type = "sent");
        });

        const messageContactToUser = messages.filter(
          (message) =>
            message.receiverId === userId && message.senderId === contactId
        );

        messageContactToUser.forEach((message) => {
          return (message.type = "received");
        });

        const concatChat = messageUsertoContact.concat(messageContactToUser);
        conversation.push(concatChat);

        const sortConversation = conversation[0].sort(
          (a, b) => a.timestamp - b.timestamp
        );

        commit("storeMessages", sortConversation);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  chatWithContact({ commit, dispatch }, contact) {
    commit("storeUserMessageReceiver", contact);
    dispatch("fetchMessages");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
