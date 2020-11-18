<template>
  <div class="chat__messages">
    <div
      v-if="userChatContactMessages"
      ref="messages"
      class="chat__messages__conversation"
    >
      <p
        v-for="message in userChatContactMessages"
        :key="message.id"
        :class="{ sent: message.type === 'sent' }"
      >
        {{ message.message }}
      </p>
    </div>
    <div 
      class="chat__messages__write" 
      @keyup.enter="sendMessage"
    >
      <input
        v-model="message"
        ref="typeMessage"
        :placeholder="$t('chat.typing')"
        type="text"
      />
      <img @click="sendMessage" src="../../assets/send.svg" alt="Send Icon" />
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";
import { mapGetters } from "vuex";

export default {
  name: "UserChatContactMessages",
  data() {
    return {
      message: null,
    };
  },
  watch: {
    userChatContactMessages() {
      this.scrollToEnd();
    },
  },
  created() {
    eventBus.$on("chat-with-contact", () => {
      if (this.$refs.typeMessage) {
        this.selectTypeInput();
      }
    });
  },
  computed: {
    ...mapGetters(["userChatContact", "userChatContactMessages"]),
  },
  methods: {
    sendMessage () {
      if (this.message) {
        this.$store.dispatch("storeMessage", this.message);
        this.clearTypeInput();
      }
    },
    clearTypeInput () {
      this.message = "";
    },
    selectTypeInput () {
      this.$refs.typeMessage.select();
    },
    scrollToEnd () {
      var container = this.$refs.messages;
      container.scrollTop = container.scrollHeight + container.clientHeight;
    },
  },
};
</script>
