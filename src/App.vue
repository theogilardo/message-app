<template>
  <div id="app">
    <the-navbar></the-navbar>
    <!-- <transition name="slide-fade"> -->
    <router-view />
    <!-- </transition> -->
    <button class="switch__trad switch__trad--en" @click="swithToEnglish">
      Eng
    </button>
    <button class="switch__trad switch__trad--fr" @click="swithToFrench">
      FR
    </button>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";

export default {
  created() {
    this.$store.dispatch("autoLogin");
  },
  components: {
    TheNavbar,
  },
  methods: {
    swithToEnglish() {
      this.$i18n.locale = "en";
    },
    swithToFrench() {
      this.$i18n.locale = "fr";
    },
  },
};
</script>

<style lang="stylus">

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.switch__trad
  position fixed
  bottom 5%
  z-index 1000

  &--en
    left 5%
  &--fr
    left 8%

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
  // background-image linear-gradient(to right, #def2ec, #e69cc0)
  // background-image linear-gradient(to right, #4c7de0, #e69cc0)
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
