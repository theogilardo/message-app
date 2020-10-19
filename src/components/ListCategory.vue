<template>
  <div>
    <input
      v-if="hasSearchBar"
      class="list-category__search-bar"
      type="text"
      placeholder="Type phone number.."
    />
    <div v-for="user in categoryList" :key="user.id" class="chat__user">
      <img src="../assets/theo.png" alt="Main Profile Photo" />
      <!-- <img :src="user.profilePic" alt="Main Profile Photo" /> -->
      <div>
        <h2>{{ user.name }} {{ user.surname }}</h2>
        <p v-if="listMessages">Lorem ipsum dolor sit amet.</p>
        <p class="list__category__phone" v-if="listContacts || listAllUsers">
          {{ user.phone }}
        </p>
      </div>
      <h3 v-if="listMessages">14:56</h3>
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

input
  border none
  width 85%
  margin 2rem
  padding 1rem
  border-radius 5px

.list__category__phone
  font-size 14px
</style>
