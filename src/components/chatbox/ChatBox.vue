<template>
  <div class="container">
    <side-bar></side-bar>

    <!-- side-panel -->
    <user-profile></user-profile>
    <chat-list></chat-list>

    <!-- chat-panel -->
    <contact-info></contact-info>
    <user-messages></user-messages>
    <input-messaging></input-messaging>
  </div>
</template>

<script>
import SideBar from "./side-panel/SideBar";
import UserProfile from "./side-panel/UserProfile";
import InputMessaging from "./chat-panel/InputMessaging";
import ContactInfo from "./chat-panel/ContactInfo";
import UserMessages from "./chat-panel/UserMessages";
import ChatList from "./side-panel/ChatList";

export default {
  name: "Chatbox",
  components: {
    SideBar,
    UserProfile,
    InputMessaging,
    ContactInfo,
    UserMessages,
    ChatList,
  },
  data() {
    return {
      profilePic: null,
    };
  },

  created() {
    const localUserData = JSON.parse(localStorage.getItem("storeUser"));
    this.$store.commit("storeUser", localUserData);
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style lang="stylus" scoped>

.container
  width 100%
  min-height 100vh
  display grid
  grid-template-columns: 5% 20% 1fr;
  grid-template-rows: 125px 150px 1fr 100px;
</style>
