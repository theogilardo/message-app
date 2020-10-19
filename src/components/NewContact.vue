<template>
  <div class="new-contact">
    <input
      class="new-contact__input"
      type="text"
      placeholder="Type phone number.."
      v-model="contact"
    />
    <div class="new-contact__list-users">
      <div v-for="user in users" :key="user.id" class="new-contact__user">
        <img src="../assets/theo.png" alt="Main Profile Photo" />
        <!-- <img :src="user.profilePic" alt="Main Profile Photo" /> -->
        <h2>{{ user.name }} {{ user.surname }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewContact",
  data() {
    return {};
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
};
</script>

<style lang="stylus" scoped>
.new-contact
  height: 100vh;
  padding: 2rem;

  &__input
    border none
    width 100%
    padding 1rem
    border-radius 5px

  &__list-users
    display flex
    align-items center
    justify-content center
    flex-direction column

  &__user
    display flex
    align-items center
    justify-content center

    img
      object-fit: cover;
      width: 50px;
      height: 50px;
      border-radius: 50%;
</style>
