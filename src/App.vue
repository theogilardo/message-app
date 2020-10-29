<template>
  <div id="app">
    <the-navbar></the-navbar>
    <!-- <transition name="slide-fade"> -->
    <router-view />
    <!-- </transition> -->
    <!-- <div class="logo">
      <router-link to="/login">
        <img class="logo__img" src="./assets/logo.png" alt="logo" />
      </router-link>
    </div>
    <div class="switch__trad">
      <a class="switch__trad--en" @click="swithToEnglish">
        <img
          class="switch__trad__icon"
          :class="{ 'trad-active': isActive }"
          src="./assets/flag-us.svg"
          alt="Flag USA"
        />
      </a>
      <a class="switch__trad--fr" @click="swithToFrench">
        <img
          class="switch__trad__icon"
          :class="{ 'trad-active': !isActive }"
          src="./assets/flag-fr.svg"
          alt="Flag FR"
        />
      </a>
    </div> -->
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";

export default {
  data() {
    return {
      isActive: true,
    };
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
  components: {
    TheNavbar,
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

<style lang="stylus">

.logo
  position: absolute;
  z-index 500
  top: 1.8rem;
  right: 15rem;

.logo__img
  width: 45px;

.slide-fade-enter-active
  transition: all .3s ease;

.slide-fade-leave-active
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);

.slide-fade-enter, .slide-fade-leave-to
  transform: translateX(10px);
  opacity: 0;

.switch__trad
  position fixed
  z-index 1000
  position: absolute;
  top: 4%;
  right: 2.5rem
  display flex
  align-items center
  justify-content center

  &--fr
    margin-left 1rem

  &__icon
    opacity .5
    width 24px

.trad-active
  opacity 1 !important
  backgorund pink

html
  font-size: 62.5%; // 1rem = 10px

  h1
    font-size: 4.6rem;

  h2
    font-size: 2.2rem;

  h3
    font-size: 1.6rem;

  h4
    font-size: 1rem;

  p
    font-size: 1.4rem;

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  min-height 100vh
  width 100%
  background-color #DEF2EC
  position relative

*,
*::before,
*::after
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration none

button:focus
  outline 0

input:focus
  outline 0
</style>
