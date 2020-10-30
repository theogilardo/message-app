<template>
  <div v-if="userChatContact" class="chat__contact">
    <img :src="userChatContact.profilePic" alt="Main Profile Photo" />
    <div class="chat__contact__information">
      <h1>{{ userChatContact.name }} {{ userChatContact.surname }}</h1>
      <p v-if="userChatContactMessages.length > 1">
        {{ userChatContactMessages.length }} messages
      </p>
      <p v-else>{{ userChatContactMessages.length }} message</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userChatContact() {
      return this.$store.getters.userChatContact;
    },
    userChatContactMessages() {
      return this.$store.getters.userChatContactMessages;
    },
  },
};
</script>
