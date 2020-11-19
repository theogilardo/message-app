<template>
  <div class="chat__side-bar">
    <div class="chat__side-bar__container">
      <a 
        v-if="user" 
        class="chat__side-bar__link"
      >
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
        :class="{'chat__side-bar__link--active': listType === 'list-users'}"
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
      <router-link class="link" to="/">
        <div>
          <a class="chat__side-bar__link">
            <img
              class="chat__side-bar__icon chat__side-bar__icon"
              src="../../assets/logo.png"
              alt="Menu Button"
            />
          </a>
        </div>
      </router-link>
      <div>
        <a 
          class="chat__side-bar__link" 
          @click="logoutAndRedirect"
        >
          <img
            class="chat__side-bar__icon chat__side-bar__icon--last"
            src="../../assets/logout.svg"
            alt="Edit Button"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
  name: "UserChatSideBar",
  computed: {
    ...mapGetters([
      "user", 
      "userChatContacts", 
      "listType"
    ]),
  },
  methods: {
    ...mapMutations({
      logout :'logout', 
      switchToUserMessages: 'switchToUserMessages', 
      switchToUsers: 'switchToUsers'
    }),
    logoutAndRedirect () {
      this.redirectHome();
      this.logout();
    },
    redirectHome () {
      this.$router.push("/login");
      location.reload();
    },
  },
};
</script>

<style lang="stylus" scoped></style>
