<template>
  <div v-show="!userChatContact" class="chat__onboarding">
    <h1 class="chat__onboarding__text__main">
      {{ $t("chat.onboarding.welcome") }} !
      <h2 class="chat__onboarding__text__second">
        {{ $t("chat.onboarding.subline") }}
      </h2>
    </h1>
  </div>
</template>

<script>
export default {
  name: "UserChatOnboarding",
  computed: {
    userChatContact() {
      return this.$store.getters.userChatContact;
    },
  },
};
</script>
