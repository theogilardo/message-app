<template>
  <div class="list-category">
    <input
      v-if="hasSearchBar"
      class="list-category__search-bar"
      type="text"
      placeholder="Type phone number.."
    />
    <div
      v-for="user in categoryList"
      :key="user.id"
      class="list-category__user"
    >
      <img
        class="list-category__user__img"
        src="../assets/theo.png"
        alt="Main Profile Photo"
      />
      <!-- <img :src="user.profilePic" alt="Main Profile Photo" /> -->
      <div class="list-category__user__info">
        <h2 class="list-category__user__info__name">
          {{ user.name }} {{ user.surname }}
        </h2>
        <p v-if="listMessages" class="list-category__user__info__message">
          Lorem ipsum dolor sit amet.
        </p>
        <p
          v-if="listContacts || listAllUsers"
          class="list-category__user__info__phone"
        >
          {{ user.phone }}
        </p>
      </div>
      <h3 v-if="listMessages" class="list-category__user__time">14:56</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListType",
  props: {
    categoryList: {
      type: Array,
    },
    hasSearchBar: {
      type: Boolean,
      default: false,
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    listContacts: {
      type: Boolean,
      default: false,
    },
    listMessages: {
      type: Boolean,
      default: false,
    },
    listAllUsers: {
      type: Boolean,
      default: false,
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
    margin 2rem
    padding 1rem
    border-radius 5px

  &__user
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebebeb50;
    padding: 20px;
    height: 80px;
    width: 100%;

    &__img
      object-fit: cover;
      width: 50px;
      height: 50px;
      border-radius: 50%;

    &__info
      text-align: left;
      margin-left: 15px;
      color: white;

      &__name
        font-size: 17px;

      &__message
        font-size: 12px;

      &__phone
        font-size 14px

    &__time
      margin-left: auto;
      font-size: 13px;
      opacity: 0.9;
      color: white;
</style>
