<template>
  <div v-if="!isPathChat">
    <div class="switch__trad">
      <a class="switch__trad--en" @click="swithToEnglish">
        <img
          :class="{ 'trad-active': isActive }"
          class="switch__trad__icon"
          src="../assets/flag-us.svg"
          alt="Flag USA"
        />
      </a>
      <a class="switch__trad--fr" @click="swithToFrench">
        <img
          :class="{ 'trad-active': !isActive }"
          class="switch__trad__icon"
          src="../assets/flag-fr.svg"
          alt="Flag FR"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      isActive: true,
    };
  },
  computed: {
    isPathChat() {
      return this.$route.name === "Chat";
    },
  },
  methods: {
    swithToEnglish() {
      this.$i18n.locale = "en";
      this.isActive = !this.isActive;
    },
    swithToFrench() {
      this.$i18n.locale = "fr";
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="stylus" scoped>

.switch__trad
  display: flex;
  justify-content: flex-end;
  width: 85%;
  max-width: 1366px;
  position: fixed;
  z-index: 1000;
  bottom: 5%;
  left: 48%;
  transform: translateX(-50%);
  align-items: center;

  &--fr
    margin-left 1rem

  &__icon
    opacity .5
    width 24px

.trad-active
  opacity 1 !important
</style>
