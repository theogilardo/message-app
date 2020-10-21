<template>
  <div class="chat">
    <div class="logo">
      <router-link to="/login">
        <img class="logo__img" src="../assets/logo.png" alt="logo" />
      </router-link>
    </div>
    <div class="background"></div>
    <div class="chat__side-bar">
      <div class="chat__side-bar__container">
        <!-- <a class="chat__side-bar__link">
          <img
            class="chat__side-bar__icon"
            src="../assets/edit.svg"
            alt="Edit Button"
          />
        </a> -->
        <a class="chat__side-bar__link">
          <img
            class="chat__side-bar__profile-pic"
            src="../assets/theo.png"
            alt="Edit Button"
          />
        </a>
        <a
          :class="{
            'chat__side-bar__link--active': listCategoryType === 'Messages',
          }"
          @click="switchToMessages"
          class="chat__side-bar__link"
        >
          <img
            class="chat__side-bar__icon"
            src="../assets/chat.svg"
            alt="Edit Button"
          />
        </a>
        <a
          :class="{
            'chat__side-bar__link--active': listCategoryType === 'Contacts',
          }"
          class="chat__side-bar__link"
          @click="switchToContacts"
        >
          <img
            class="chat__side-bar__icon"
            src="../assets/contact-book.svg"
            alt="Edit Button"
          />
        </a>
      </div>
      <div>
        <!-- <a class="chat__side-bar__link">
          <img
            class="chat__side-bar__icon"
            src="../assets/dots.svg"
            alt="Edit Button"
          />
        </a> -->
        <a class="chat__side-bar__link">
          <img
            class="chat__side-bar__icon chat__side-bar__icon__last"
            src="../assets/logout.svg"
            alt="Edit Button"
          />
        </a>
      </div>
    </div>
    <div class="chat__search">
      <input type="text" placeholder="Search here .." />
      <!-- <img src="../assets/search.svg" alt="Edit Button" /> -->
    </div>

    <div v-if="users" class="chat__category">
      <h3 class="chat__category__name">{{ listCategoryType }}</h3>
      <!-- <h3>({{ listAmount }})</h3> -->
      <a @click="switchToNewContact">
        <img
          v-if="listCategoryType === 'Contacts'"
          class="chat__category__icon"
          src="../assets/add-contact.svg"
          alt="Add contact"
        />
      </a>
    </div>

    <div class="chat__users">
      <list-category
        v-if="listCategoryType === 'Contacts'"
        :category-list="userContacts"
        :has-button="true"
        :list-contacts="true"
      ></list-category>
      <list-category
        v-if="listCategoryType === 'Messages'"
        :category-list="userMessages"
        :list-messages="true"
      ></list-category>
      <list-category
        v-if="listCategoryType === 'Find New Contact'"
        :category-list="users"
        :list-all-users="true"
        :has-search-bar="true"
        :has-button="true"
        :has-icon="true"
      ></list-category>
    </div>

    <div v-if="user" class="chat__main-user">
      <!-- <img :src="user.profilePic" alt="Main Profile Photo" /> -->
      <img src="../assets/theo.png" alt="Main Profile Photo" />
      <div class="chat__main-user__information">
        <h1>{{ user.name }} {{ user.surname }}</h1>
        <p>1890 messages</p>
      </div>
    </div>
    <div class="chat__messages">
      <div v-if="messages" class="chat__messages__conversation">
        <!-- <div
          :class="{ 'receiver-box': message.type === 'receiver' }"
          v-for="message in newMessages"
          :key="message.id"
        >
          <p :class="{ receiver: message.type === 'receiver' }">
            {{ message.message }}
          </p>
        </div> -->
      </div>
      <div class="chat__messages__write">
        <input
          v-model="message"
          type="text"
          placeholder="Type your message here.."
        />
        <img src="..//assets/send.svg" alt="Send Icon" />
      </div>
    </div>
  </div>
</template>

<script>
import ListCategory from "./ListCategory.vue";

export default {
  name: "Chatbox",
  components: {
    ListCategory,
  },
  data() {
    return {
      category: "Contacts",
      message: null,
      messages: [],
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    user() {
      return this.$store.getters.user;
    },
    userContacts() {
      return this.$store.getters.userContacts;
    },
    userMessages() {
      return this.$store.getters.userMessages;
    },
    listCategoryType() {
      return this.$store.getters.listCategoryType;
    },
    listAmount() {
      if (this.category === "Contacts") {
        return Object.keys(this.user.contacts).length;
      }
      return this.users.length;
    },
  },
  methods: {
    switchToMessages() {
      return this.$store.commit("switchToMessages");
    },
    switchToContacts() {
      return this.$store.commit("switchToContacts");
    },
    switchToNewContact() {
      return this.$store.commit("switchToNewContact");
    },
  },
};
</script>

<style lang="stylus">

.logo
  position: absolute;
  top: 18px;
  right: 17px;

.logo__img
  width: 45px;

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

  &__users
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

      div
        p
          padding: 8px 14px;
          background: #4c7de0;
          color: white;
          border-radius: 7px;
          width: 50%;
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
        // border-top: 1px solid #e3e3e3;
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
