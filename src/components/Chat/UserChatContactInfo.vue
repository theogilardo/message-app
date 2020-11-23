<template>
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
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "contactInfo",
  computed: {
    ...mapGetters([
      "contact",
      "contactMessages"
    ]),
  },
};
</script>
