<template>
  <div class="chat__messages">
    <div
      v-if="contactMessages"
      ref="messages"
      class="chat__messages__conversation"
    >
      <p
        v-for="message in contactMessages"
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
      <img 
        @click="sendMessage" 
        src="../../assets/send.svg" 
        alt="Send Icon" 
      />
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ContactMessages",
  data() {
    return {
      message: null,
    };
  },
  watch: {
    contactMessages() {
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
    ...mapGetters([
      "contact", 
      "contactMessages"
    ]),
  },
  methods: {
    ...mapActions([
      "storeMessage"
    ]),
    sendMessage () {
      if (this.message) {
        this.storeMessage(this.message);
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
