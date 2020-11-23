<template>
  <div class="list-category" v-if="contact">
    <div
      v-for="user in contactsSorted"
      :key="user.id"
      :class="{ activeChat: user.localId === contact.localId }"
      class="list-category__user"
      @click="fetchMessages(user)"
    >
      <img
        :src="user.profilePic"
        class="list-category__user__img"
        alt="Main Profile Photo"
      />
      <div class="list-category__user__info">
        <h2 class="list-category__user__info__name">
          {{ user.name }} {{ user.surname }}
        </h2>
        <p class="list-category__user__info__message">
          {{ user.messages | sliceMessage }}
        </p>
      </div>

      <h3 class="list-category__user__time">
        {{ user.messages | setTimeHourMinutes }}
      </h3>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Messages",
  data() {
    return {
      test: {},
      userContacts: [],
    };
  },
  computed: {
    ...mapGetters([
      "contacts",
      "contactsSorted",
      "contact",
    ]),
  },
  methods: {
    ...mapActions([
      'chatWithContact'
    ]),
    fetchMessages (user) {
      eventBus.$emit("chat-with-contact");
      this.chatWithContact(user);
    },
  },
};
</script>

<style lang="stylus" scoped>

.activeChat
  background #f8f8f8
  color #333 !important

.list-category
  width 100%
  color white

  &__search-bar
    border none
    width 85%
    opacity .65
    margin 2rem
    padding .8rem
    border-radius 5px

  &__user
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebebeb50;
    padding: 20px;
    height: 70px;
    width: 100%;
    color #E8E8E8
    transition all .6s

    &:hover
      background #F8F8F8
      color #333 !important

    &__img
      object-fit: cover;
      width: 45px;
      height: 45px;
      border-radius: 50%;

    &__info
      text-align: left;
      margin-left: 15px;

      &__name
        font-size: 1.4rem;

      &__message
        font-size: 1.1rem;

      &__phone
        font-size 14px

    &__time
      margin-left: auto;
      font-size: 13px;
      opacity: 0.9;

    &__btn
      margin-left auto
      background transparent
      cursor pointer

      &__add-contact
        font-weight bold
        border 2px solid #E8E8E8
        border-radius 50%
        padding .4rem .7rem

      &__chat
        border none
        border 1.5px solid #E8E8E8
        border-radius 5px
        padding .5rem
</style>
