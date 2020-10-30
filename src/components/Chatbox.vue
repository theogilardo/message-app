<template>
  <div class="chat">
    <div class="background"></div>
    <div class="chat__switch__trad">
      <a class="chat__switch__trad--en" @click="swithToEnglish">
        <img
          :class="{ 'trad-active': isActive }"
          class="chat__switch__trad__icon"
          src="../assets/flag-us.svg"
          alt="Flag USA"
        />
      </a>
      <a class="chat__switch__trad--fr" @click="swithToFrench">
        <img
          :class="{ 'trad-active': !isActive }"
          class="chat__switch__trad__icon"
          src="../assets/flag-fr.svg"
          alt="Flag FR"
        />
      </a>
    </div>
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
            'chat__side-bar__link--active':
              listCategoryType === 'list-user-messages',
          }"
          class="chat__side-bar__link"
          @click="switchToUserMessages"
        >
          <img
            class="chat__side-bar__icon"
            src="../assets/chat.svg"
            alt="Edit Button"
          />
        </a>
        <a
          :class="{
            'chat__side-bar__link--active': listCategoryType === 'list-users',
          }"
          class="chat__side-bar__link"
          @click="switchToUsers"
        >
          <img
            class="chat__side-bar__icon"
            src="../assets/contact-book.svg"
            alt="Edit Button"
          />
        </a>
      </div>
      <div>
        <a class="chat__side-bar__link" @click="logout">
          <img
            class="chat__side-bar__icon chat__side-bar__icon__last"
            src="../assets/logout.svg"
            alt="Edit Button"
          />
        </a>
      </div>
    </div>
    <div class="chat__category">
      <h3
        v-if="
          listCategoryType === 'contacts' || listCategoryType === 'messages'
        "
        class="chat__category__name"
      >
        {{ listCategoryTypeLabel }}
      </h3>
      <h3 v-else class="chat__category__name">
        {{ $t("chatbox.list.label") }}
      </h3>
    </div>

    <div class="chat__lists">
      <component
        :is="listCategoryType"
        :key="componentKey"
        @chatWithContact="selectTypeInput"
      ></component>
    </div>
    <div v-if="userChatContact" class="chat__main-user">
      <img :src="userChatContact.profilePic" alt="Main Profile Photo" />
      <div class="chat__main-user__information">
        <h1>{{ userChatContact.name }} {{ userChatContact.surname }}</h1>
        <p v-if="userChatContactMessages.length > 1">
          {{ userChatContactMessages.length }} messages
        </p>
        <p v-else>{{ userChatContactMessages.length }} message</p>
      </div>
    </div>
    <div class="chat__messages">
      <div v-if="userChatContact" class="chat__messages__conversation">
        <p
          v-for="message in userChatContactMessages"
          :key="message.id"
          :class="{ sent: message.type === 'sent' }"
        >
          {{ message.message }}
        </p>
      </div>
      <div class="chat__messages__write" @keyup.enter="sendMessage">
        <input
          v-model="message"
          ref="typeMessage"
          :placeholder="$t('chatbox.typing')"
          type="text"
        />
        <img @click="sendMessage" src="../assets/send.svg" alt="Send Icon" />
      </div>
    </div>
    <div v-show="!userChatContact" class="chat__onboarding">
      <h1 class="chat__onboarding__text__main">
        {{ $t("chatbox.onboarding.welcome") }} !
        <h2 class="chat__onboarding__text__second">
          {{ $t("chatbox.onboarding.subline") }}
        </h2>
      </h1>
    </div>
  </div>
</template>

<script>
import ListUsers from "./lists/ListUsers.vue";
import ListUserMessages from "./lists/ListUserMessages.vue";

export default {
  name: "Chatbox",
  components: {
    "list-users": ListUsers,
    "list-user-messages": ListUserMessages,
  },
  mounted() {
    this.refreshLocalStorage();
  },
  data() {
    return {
      selectedComponent: "list-user-messages",
      category: "Contacts",
      message: null,
      isActive: true,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userChatContact() {
      return this.$store.getters.userChatContact;
    },
    users() {
      return this.$store.getters.users;
    },
    userChatContacts() {
      return this.$store.getters.userChatContacts;
    },
    userChatContactMessages() {
      return this.$store.getters.userChatContactMessages;
    },
    listCategoryType() {
      return this.$store.getters.listCategoryType;
    },
    listCategoryTypeLabel() {
      return this.$store.getters.listCategoryTypeLabel;
    },
    listCategoryTypeLength() {
      return this.$store.getters.listCategoryTypeLength;
    },
    componentKey() {
      return this.$store.getters.componentKey;
    },
  },
  methods: {
    sendMessage() {
      this.$store.dispatch("storeMessage", this.message);
      this.clearTypeInput();
      this.selectTypeInput();
      this.$store.commit("forceRerender");
    },
    clearTypeInput() {
      this.message = "";
    },
    selectTypeInput() {
      this.$refs.typeMessage.select();
    },
    logout() {
      this.redirectHome();
      return this.$store.commit("logout");
    },
    redirectHome() {
      this.$router.push("/login");
      location.reload();
    },
    switchToUserMessages() {
      return this.$store.dispatch("switchToUserMessages");
    },
    switchToContacts() {
      return this.$store.dispatch("switchToContacts");
    },
    switchToUsers() {
      return this.$store.dispatch("switchToUsers");
    },
    swithToEnglish() {
      this.$i18n.locale = "en";
      this.isActive = !this.isActive;
    },
    swithToFrench() {
      this.$i18n.locale = "fr";
      this.isActive = !this.isActive;
    },
    refreshLocalStorage() {
      if (localStorage.getItem("storeUsers")) {
        const users = JSON.parse(localStorage.getItem("storeUsers"));
        this.$store.commit("storeUsers", users);
      }
      if (localStorage.getItem("storeUser")) {
        const users = JSON.parse(localStorage.getItem("storeUser"));
        this.$store.commit("storeUser", users);
      }
      if (localStorage.getItem("userChatContact")) {
        const userChatContact = JSON.parse(
          localStorage.getItem("userChatContact")
        );
        this.$store.dispatch("chatWithContact", userChatContact);
      }
      if (localStorage.getItem("messageList")) {
        const messageList = JSON.parse(localStorage.getItem("messageList"));
        this.$store.commit("storeUserChatContacts", messageList);
      }
      if (localStorage.getItem("userChatContactMessages")) {
        const messageList = JSON.parse(
          localStorage.getItem("userChatContactMessages")
        );
        this.$store.commit("storeUserChatContactMessages", messageList);
      }
    },
  },
};
</script>

<style lang="stylus">

.trad-active
  opacity 1 !important

.toast-success
  background: linear-gradient(to right, rgba(74,210,149,1), rgba(77,125,225,1)) !important

.sent
  background: #4c7de0 !important
  color: white !important
  align-self flex-end

.background
  background: linear-gradient(to right, rgba(74,210,149,1), rgba(77,125,225,1));
  grid-column: 2 / 3;
  grid-row: 1 / 4;

.chat
  position: relative;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 60px 25% 1fr;
  grid-template-rows: 80px 40px 1fr;

  &__switch__trad
    display: flex;
    position: fixed;
    z-index: 1000;
    top: 2.5rem;
    right: 3rem;
    align-items: center;

    &--fr
      margin-left 1rem

    &__icon
      opacity .5
      width 24px

  &__onboarding
    z-index 100
    background white
    heigh 100vh
    display flex
    align-items center
    justify-content center
    font-size 4rem
    grid-column: 3 /4;
    grid-row: 1 /4;

    &__text__main, &__text__second
      background-image: linear-gradient(to right, rgba(74,210,149,1), rgba(77,125,225,1));
      -webkit-background-clip: text;
      color: transparent;
      letter-spacing: 1px;

  &__side-bar
    grid-column: 1 / 2;
    grid-row: 1 / 4;
    padding 2rem 0
    width 100%
    background #E8E8E8
    display flex
    align-items center
    justify-content space-between
    flex-direction column

    &__container
      display flex
      align-items center
      justify-content center
      flex-direction column

    &__link
      width 100%
      margin-bottom 2.5rem
      position relative

      &--active::before
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 5px;
        background: linear-gradient(to right, rgba(74,210,149,1), rgba(77,125,225,1));

    &__icon
      padding 0 1.5rem
      width 90%
      filter: invert(47%) sepia(60%) saturate(640%) hue-rotate(183deg) brightness(90%) contrast(94%);

      &__last
        margin-top 2.5rem

    &__profile-pic
      border-radius 50%
      border 2px solid white
      width 40px
      height 40px
      object-fit cover

  &__search
    position relative
    width: 100%;
    grid-column: 2 / 3;
    grid-row: 1 / 2;

    input
      background: white;
      border none
      width: 100%;
      padding: .8rem;
      width: 85%;
      margin: 2rem auto;
      border-radius: 5px;
      opacity: 0.65;

    img
      position absolute
      filter: invert(83%) sepia(37%) saturate(0%) hue-rotate(148deg) brightness(82%) contrast(95%);
      top 4rem
      left 4.3rem
      transform translateY(-50%)
      width: 18px;

  &__category
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    width 100%
    color white
    text-align: left;
    padding: 0 2rem;
    margin-bottom 2rem
    display: flex;
    align-items center
    justify-content space-between

    &__icon
      width 25px
      height 25px
      filter: invert(99%) sepia(54%) saturate(130%) hue-rotate(274deg) brightness(114%) contrast(87%);

  &__lists
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    overflow-y: scroll;

  &__main-user
    height: 100%;
    width: 100%;
    padding: 20px;
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    display: flex;
    align-items: center;
    background: #f8f8f8;

    img
      object-fit: cover;
      width: 55px;
      height: 55px;
      margin-right: 15px;
      border-radius: 50%;

    &__information
      h1
        text-align: left;
        font-size: 2rem;

      p
        text-align: left;
        font-size: 1.2rem;

  &__messages
    grid-column: 3 / 4;
    grid-row: 2 / 4;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 80px;
    height: 100%;
    width: 100%;
    background: white;

    &__conversation
      overflow-y: auto;
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      display flex
      flex-direction column

      p
        padding: 8px 14px;
        color black
        background #F1F0F0
        border-radius: 7px;
        margin: 15px;
        font-size: 15px;
        text-align: left;
        overflow-wrap: break-word;
        width: max-content;
        max-width: 50%;

    &__write
      position: relative;
      grid-column: 1 / 2;
      grid-row: 2 / 3;

      input
        border: none;
        border-top: 1px solid #4c7de050;
        padding: 2rem;
        width: 100%;

      img
        position: absolute;
        top: 50%;
        right: 25px;
        transform: translateY(-50%);
        width: 25px;
        opacity: 0.8;
</style>
