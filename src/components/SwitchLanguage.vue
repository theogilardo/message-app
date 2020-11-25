<template>
  <div
    class="switch__trad"
    :class="{
      'switch__trad__top-right': positionTop,
      'switch__trad__bottom-right': positionBottom,
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
    position: {
      type: String,
      default: null,
      required: true,
      validator: function(value) {
        return ['bottom', 'top'].indexOf(value) !== -1
      }
    },
  },
  computed: {
    positionTop() {
      return this.position === 'top'
    },
    positionBottom() {
      return this.position === 'bottom'
    }
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
