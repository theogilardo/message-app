<template>
  <div class="list-category">
    <input
      v-model="search"
      :placeholder="$t('chat.list.placeholder')"
      class="list-category__search-bar"
      type="text"
    />
    <div 
      v-for="user in filterUsers" 
      :key="user.id" 
      class="list-category__user"
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
        <p class="list-category__user__info__phone">
          {{ user.phone }}
        </p>
      </div>
      <button class="list-category__user__btn list-category__user__btn__chat" >
        <router-link
          :to="`/chat/${user.name}`"
          @click.native="redirectToChatContact(user)">
            Chat
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "FindUsers",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapGetters([
      "users", 
      "listType"
    ]),
    filterUsers() {
      return this.users.filter((user) => user.phone.match(this.search.trim()));
    },
  },
  methods: {
    ...mapActions([
      "chatWithContact",
      "fetchMessages"
    ]),
    redirectToChatContact (contact) {
      eventBus.$emit("chat-with-contact");
      this.chatWithContact(contact);
    },
  },
};
</script>

<style lang="stylus" scoped>

.list-category
  width 100%

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
    color: white;
    transition all .6s

    &:hover
      background #F8F8F8
      color #333 !important

      & > .list-category__user__btn__chat
        border 1.5px solid #333

      & > .list-category__user__btn
        color #333 !important

      & > .list-category__user__link
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
      color #E8E8E8
      cursor pointer
      transition all .6s

      a
        color inherit

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
