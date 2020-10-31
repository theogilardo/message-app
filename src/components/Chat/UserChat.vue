<template>
  <div class="chat">
    <div class="background"></div>
    <switch-trad :is-footer="false"></switch-trad>
    <side-bar></side-bar>
    <list-label></list-label>
    <component :is="listType" class="chat__lists"></component>
    <contact-info></contact-info>
    <contact-messages></contact-messages>
    <user-onboarding></user-onboarding>
  </div>
</template>

<script>
import ListLabel from "./../Lists/ListLabel.vue";
import ListUsers from "./../Lists/ListUsers.vue";
import ListUserMessages from "./../Lists/ListUserMessages.vue";
import UserChatSideBarVue from "./UserChatSideBar.vue";
import UserChatCurrentContact from "./UserChatCurrentContact.vue";
import UserChatContactMessages from "./UserChatContactMessages.vue";
import UserChatOnboarding from "./UserChatOnboarding.vue";
import SwitchTrad from "../SwitchTrad.vue";
import { mapGetters } from "vuex";

export default {
  name: "UserChat",
  components: {
    "list-label": ListLabel,
    "list-users": ListUsers,
    "list-user-messages": ListUserMessages,
    "side-bar": UserChatSideBarVue,
    "contact-info": UserChatCurrentContact,
    "contact-messages": UserChatContactMessages,
    "user-onboarding": UserChatOnboarding,
    "switch-trad": SwitchTrad,
  },
  mounted() {
    this.refreshLocalStorage();
  },
  created() {
    this.$toasted.success("Logged In", {
      className: "toast-success",
      theme: "bubble",
      position: "top-right",
      duration: 2000,
    });
  },
  computed: {
    ...mapGetters(["listType"]),
  },
  methods: {
    refreshLocalStorage() {
      if (localStorage.getItem("storeUser")) {
        const user = JSON.parse(localStorage.getItem("storeUser"));
        this.$store.commit("storeUser", user);
      }
      if (localStorage.getItem("storeUsers")) {
        const users = JSON.parse(localStorage.getItem("storeUsers"));
        this.$store.commit("storeUsers", users);
      }
      if (localStorage.getItem("userChatContact")) {
        const userChatContact = JSON.parse(
          localStorage.getItem("userChatContact")
        );
        this.$store.dispatch("chatWithContact", userChatContact);
      }
      if (localStorage.getItem("userChatContacts")) {
        const userChatContacts = JSON.parse(
          localStorage.getItem("userChatContacts")
        );
        this.$store.commit("storeUserChatContacts", userChatContacts);
      }
      if (localStorage.getItem("userChatContactMessages")) {
        const userChatContactMessages = JSON.parse(
          localStorage.getItem("userChatContactMessages")
        );
        this.$store.commit(
          "storeUserChatContactMessages",
          userChatContactMessages
        );
      }
      this.$store.commit("messagesLoadedTrue");
    },
  },
};
</script>

<style lang="stylus">

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

  &__onboarding
    z-index 100
    background white
    heigh 100vh
    position relative
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
      width 100%

      &--last
        margin-top 2.5rem
        width 94%

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

  &__lists
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    overflow-y: scroll;

  &__contact
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
        width: 30px;
        opacity: 0.8;
</style>
