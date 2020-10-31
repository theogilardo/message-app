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
import { mapGetters } from "vuex";

export default {
  name: "UserChatOnboarding",
  computed: {
    ...mapGetters(["userChatContact"]),
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
  margin-top 5rem
  padding 2.5rem
  border-radius 5rem
  animation: float 6s ease-in-out infinite;
</style>
