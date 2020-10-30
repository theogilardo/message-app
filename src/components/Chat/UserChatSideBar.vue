<template>
  <div class="chat__side-bar">
    <div class="chat__side-bar__container">
      <a v-if="user" class="chat__side-bar__link">
        <img
          :src="user.profilePic"
          class="chat__side-bar__profile-pic"
          alt="Edit Button"
        />
      </a>
      <a
        v-if="userChatContacts.length"
        :class="{
          'chat__side-bar__link--active': listType === 'list-user-messages',
        }"
        class="chat__side-bar__link"
        @click="switchToUserMessages"
      >
        <img
          class="chat__side-bar__icon"
          src="../../assets/chat.svg"
          alt="Edit Button"
        />
      </a>
      <a
        :class="{
          'chat__side-bar__link--active': listType === 'list-users',
        }"
        class="chat__side-bar__link"
        @click="switchToUsers"
      >
        <img
          class="chat__side-bar__icon"
          src="../../assets/contact-book.svg"
          alt="Edit Button"
        />
      </a>
    </div>
    <div>
      <a class="chat__side-bar__link" @click="logout">
        <img
          class="chat__side-bar__icon chat__side-bar__icon__last"
          src="../../assets/logout.svg"
          alt="Edit Button"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserChatSideBar",
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userChatContacts() {
      return this.$store.getters.userChatContacts;
    },
    listType() {
      return this.$store.getters.listType;
    },
  },
  methods: {
    logout() {
      this.redirectHome();
      return this.$store.commit("logout");
    },
    switchToUserMessages() {
      return this.$store.commit("switchToUserMessages");
    },
    switchToUsers() {
      return this.$store.commit("switchToUsers");
    },
    redirectHome() {
      this.$router.push("/login");
      location.reload();
    },
  },
};
</script>

<style lang="stylus" scoped></style>
