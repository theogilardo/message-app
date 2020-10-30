<template>
  <div v-show="!userChatContact" class="chat__onboarding">
    <img
      class="chat__onboarding__photo"
      src="../../assets/hello.png"
      alt="Hello"
    />
    <div class="chat__onboarding__header">
      <h1 class="chat__onboarding__text__main">
        {{ $t("chat.onboarding.welcome") }} !
        <h2 class="chat__onboarding__text__second">
          {{ $t("chat.onboarding.subline") }}
        </h2>
      </h1>
    </div>
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

<style lang="stylus" scoped>

.chat__onboarding__photo
  width 30%
  opacity .8
  position absolute
  z-index -1

.chat__onboarding__header
  background #ffffffad
  padding 2.5rem
  border-radius 5rem
</style>
