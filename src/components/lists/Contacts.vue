<template>
  <div class="list-category">
    <div
      v-for="user in userContacts"
      :key="user.id"
      class="list-category__user"
    >
      <img
        class="list-category__user__img"
        src="../../assets/theo.png"
        alt="Main Profile Photo"
      />
      <!-- <img :src="user.profilePic" alt="Main Profile Photo" /> -->
      <div class="list-category__user__info">
        <h2 class="list-category__user__info__name">
          {{ user.name }} {{ user.surname }}
        </h2>
        <p class="list-category__user__info__phone">
          {{ user.phone }}
        </p>
      </div>
      <button
        class="list-category__user__btn list-category__user__btn__chat"
        @click="chatWithContact(user)"
      >
        Chat
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contacts",
  computed: {
    listCategoryType() {
      return this.$store.getters.listCategoryType;
    },
    userContacts() {
      return this.$store.getters.userContacts;
    },
  },
  methods: {
    chatWithContact(contact) {
      return this.$store.dispatch("chatWithContact", contact);
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

    &__img
      object-fit: cover;
      width: 45px;
      height: 45px;
      border-radius: 50%;

    &__info
      text-align: left;
      margin-left: 15px;
      color: white;

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
      color: white;

    &__btn
      margin-left auto
      background transparent
      color #E8E8E8
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
