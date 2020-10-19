<template>
  <div class="chat">
    <div class="logo">
      <router-link to="/Profile">
        <img class="logo__img" src="../assets/logo.png" alt="logo" />
      </router-link>
    </div>
    <div class="chat__side-bar">
      <div>
        <router-link to="/contacts" class="chat__side-bar__link">
          <img
            class="chat__side-bar__icon"
            src="../assets/edit.svg"
            alt="Edit Button"
          />
        </router-link>
        <router-link to="/contacts" class="chat__side-bar__link">
          <img
            class="chat__side-bar__profile-pic"
            src="../assets/theo.png"
            alt="Edit Button"
          />
        </router-link>
        <router-link
          :class="{ 'chat__side-bar__link--active': isMessagesCategory }"
          @click.native="switchToMessages"
          class="chat__side-bar__link"
          to="/messages"
        >
          <img
            class="chat__side-bar__icon"
            src="../assets/chat.svg"
            alt="Edit Button"
          />
        </router-link>
        <router-link
          :class="{ 'chat__side-bar__link--active': isContactCategory }"
          class="chat__side-bar__link"
          @click.native="switchToContacts"
          to="/contacts"
        >
          <img
            class="chat__side-bar__icon"
            src="../assets/contact-book.svg"
            alt="Edit Button"
          />
        </router-link>
      </div>
      <div>
        <router-link to="/contacts" class="chat__side-bar__link">
          <img
            class="chat__side-bar__icon"
            src="../assets/dots.svg"
            alt="Edit Button"
          />
        </router-link>
        <router-link
          to="/contacts"
          class="chat__side-bar__link chat__side-bar__link--last"
        >
          <img
            class="chat__side-bar__icon"
            src="../assets/logout.svg"
            alt="Edit Button"
          />
        </router-link>
      </div>
    </div>
    <div class="chat__search">
      <input type="text" placeholder="Search here .." />
      <img src="../assets/search.svg" alt="Edit Button" />
    </div>

    <div class="chat__category">
      <h3>{{ category }} (23)</h3>
    </div>

    <div class="chat__users">
      <router-view></router-view>
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
export default {
  name: "Chatbox",
  data() {
    return {
      category: "Contacts",
      message: null,
      messages: [],
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isContactCategory() {
      return this.category === "Contacts";
    },
    isMessagesCategory() {
      return this.category === "Messages";
    },
    // users() {
    //   return this.$store.getters.users;
    // },
  },
  methods: {
    switchToMessages() {
      this.category = "Messages";
    },
    switchToContacts() {
      this.category = "Contacts";
    },
  },
};
</script>

<style lang="stylus">

.chat__side-bar__link::before.test
  opacity 1 !important
  background blue !important

.receiver
  margin-left: 80% !important;
  background-color: red !important;


.receiver-box
  position: relative;


.logo
  position: absolute;
  top: 20px;
  right: 17px;


.logo__img
  width: 60px;


.activeChat
  background: #f8f8f8;

  div,
  h3
    color: #2c3e50 !important;

.chat
  position: relative;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 60px 25% 1fr;
  grid-template-rows: 100px 40px 1fr;
  // background: linear-gradient(
  // 85deg,
  // rgba(230, 156, 192, 1) 0%,
  // rgba(76, 125, 224, 1) 117%
  // );

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
        background: #ff9346;

      &--last
        margin 0

    div
      display flex
      align-items center
      justify-content center
      flex-direction column

    &__icon
      padding 0 1.5rem
      width 100%
      filter: invert(47%) sepia(60%) saturate(640%) hue-rotate(183deg) brightness(90%) contrast(94%);

    &__profile-pic
      border-radius 50%
      width 40px
      height 40px
      object-fit cover

  &__search
    position relative
    background #4c7de0
    // background: linear-gradient(
    // 85deg,
    // rgba(230, 156, 192, 1) 0%,
    // rgba(76, 125, 224, 1) 117%
    // );
    width: 100%;
    grid-column: 2 / 3;
    grid-row: 1 / 2;

    input
      background: white;
      border none
      width: 100%;
      padding: 2rem 4rem;
      height: 30px;
      width: 85%;
      margin: 2rem auto;
      border-radius: 5px;
      opacity: 0.65;

    img
      position absolute
      filter: invert(83%) sepia(37%) saturate(0%) hue-rotate(148deg) brightness(82%) contrast(95%);
      top 4rem
      left 3.5rem
      transform translateY(-50%)
      width: 18px;

  &__category
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    width 100%
    background #4c7de0
    color white
    text-align: left;
    padding: 0 2.5rem;
    display: flex;

  &__users
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    overflow-y: scroll;
    background #4c7de0
    // background: linear-gradient(
    //   85deg,
    //   rgba(230, 156, 192, 1) 0%,
    //   rgba(76, 125, 224, 1) 117%
    // );


  &__user
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebebeb50;
    padding: 20px;
    height: 80px;
    width: 100%;

    img
      margin-left: 25px;
      object-fit: cover;
      width: 50px;
      height: 50px;
      border-radius: 50%;


    div
      text-align: left;
      margin-left: 15px;
      color: white;
      h2
        font-size: 16px;

      p
        font-size: 8px;



    h3
      margin-left: auto;
      font-size: 13px;
      opacity: 0.9;
      color: white;



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
      width: 70px;
      height: 70px;
      margin-right: 15px;
      border-radius: 50%;


    &__information
      h1
        text-align: left;
        font-size: 24px;

      p
        text-align: left;
        font-size: 16px;



  &__messages
    grid-column: 3 / 4;
    grid-row: 2 / 4;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 60px;
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
        border-top: 1px solid #e3e3e3;
        padding: 14px;
        width: 100%;


      img
        position: absolute;
        top: 50%;
        right: 25px;
        transform: translateY(-50%);
        width: 25px;
        opacity: 0.8;
</style>
