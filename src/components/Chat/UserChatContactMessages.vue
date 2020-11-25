<template>
<div class="chat__container">
 <div 
    v-if="contact" 
    class="chat__contact"
  >
    <img 
      :src="contact.profilePic" 
      alt="Main Profile Photo" 
    />
    <div class="chat__contact__information">
      <h1>{{ contact.name }} {{ contact.surname }}</h1>
      <p v-if="contactMessages.length > 1">
        {{ contactMessages.length }} messages
      </p>
      <p v-else>{{ contactMessages.length }} message</p>
    </div>
  </div>
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

<style lang="stylus" scoped>

.chat__container
  grid-column 3/4
  grid-row 1/4
  display grid
  grid-template-columns 1fr
  grid-template-rows 80px 1fr

</style>