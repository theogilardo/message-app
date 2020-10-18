<template>
  <div class="container">
    <side-bar></side-bar>
    <user-profile></user-profile>
    <div class="container__contacts-list">
      <h3>contacts-list here</h3>
    </div>
    <div class="container__contact-info">
      <h3>contact-info here</h3>
    </div>
    <div class="container__messages">
      <h3>Messages here</h3>
    </div>
    <div class="container__typing">
      <h3>Typing here</h3>
    </div>
  </div>
</template>

<script>
import sideBar from "./side-panel/SideBar";
import userProfile from "./side-panel/UserProfile";

export default {
  name: "Chatbox",
  components: {
    sideBar,
    userProfile,
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
  display: grid;
  grid-template-columns: 10% 25% 1fr;
  grid-template-rows: 120px 1fr 100px;

  &__contacts-list
    border 1px solid blue
    grid-row 2/4
    grid-column 2/3

  &__contact-info
    border 1px solid green
    grid-row 1/2
    grid-column 3/4

  &__messages
    border 1px solid purple
    grid-row 2/3
    grid-column 3/4

  &__typing
    border 1px solid yellow
    grid-row 3/4
    grid-column 3/4
</style>
