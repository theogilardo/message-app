<template>
  <div
    class="switch__trad"
    :class="{
      'switch__trad__top-right': !isFooter && isPathChat,
      'switch__trad__bottom-right': isFooter && !isPathChat,
    }"
  >
    <a class="switch__trad--en" @click="swithToEnglish">
      <img
        :class="{ 'trad-active': !isActive }"
        class="switch__trad__icon"
        src="../assets/flag-us.svg"
        alt="Flag USA"
      />
    </a>
    <a class="switch__trad--fr" @click="swithToFrench">
      <img
        :class="{ 'trad-active': isActive }"
        class="switch__trad__icon"
        src="../assets/flag-fr.svg"
        alt="Flag FR"
      />
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  props: {
    isFooter: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isPathChat() {
      return this.$route.name === "Chat";
    },
  },
  methods: {
    swithToEnglish () {
      this.$i18n.locale = "en";
      this.switchActive();
    },
    swithToFrench () {
      this.$i18n.locale = "fr";
      this.switchActive();
    },
    switchActive () {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="stylus" scoped>

.switch__trad
  display: flex;
  position: fixed;
  z-index: 1000;
  align-items: center;

  &__top-right
    top: 2.5rem;
    right: 3rem;

  &__bottom-right
    bottom: 5%;
    left: 48%;
    width: 85%;
    max-width: 1366px;
    transform: translateX(-50%);
    justify-content: flex-end;

  &--fr
    margin-left 1rem

  &__icon
    opacity .3
    width 24px

.trad-active
  opacity 1 !important
</style>
