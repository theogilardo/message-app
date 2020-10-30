<template>
  <div class="chat__messages">
    <div v-if="userChatContactMessages" class="chat__messages__conversation">
      <p
        v-for="message in userChatContactMessages"
        :key="message.id"
        :class="{ sent: message.type === 'sent' }"
      >
        {{ message.message }}
      </p>
    </div>
    <div class="chat__messages__write" @keyup.enter="sendMessage">
      <input
        v-model="message"
        ref="typeMessage"
        :placeholder="$t('chat.typing')"
        type="text"
      />
      <img @click="sendMessage" src="../assets/send.svg" alt="Send Icon" />
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  data() {
    return {
      message: null,
    };
  },
  created() {
    eventBus.$on("chatWithContact", () => {
      this.selectTypeInput();
    });
  },
  computed: {
    userChatContact() {
      return this.$store.getters.userChatContact;
    },
    userChatContactMessages() {
      return this.$store.getters.userChatContactMessages;
    },
  },
  methods: {
    sendMessage() {
      this.$store.dispatch("storeMessage", this.message);
      this.clearTypeInput();
      this.selectTypeInput();
      this.$store.commit("forceRerender");
    },
    clearTypeInput() {
      this.message = "";
    },
    selectTypeInput() {
      this.$refs.typeMessage.select();
    },
  },
};
</script>
