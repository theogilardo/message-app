<template>
  <div id="app">
    <the-navbar></the-navbar>
    <transition name="slide-fade">
      <router-view />
    </transition>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";
import TheFooter from "./components/TheFooter";

export default {
  name: "App",
  data() {
    return {
      isActive: true,
    };
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
  components: {
    "the-navbar": TheNavbar,
    "the-footer": TheFooter,
  },
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Roboto&display=swap');

.logo
  position: absolute;
  z-index 500
  top: 1.8rem;
  right: 15rem;

.logo__img
  width: 45px;

.slide-fade-enter-active
  transition: all .8s ease;

.slide-fade-leave-active
  transition: all .8s ease

.slide-fade-enter, .slide-fade-leave-to
  transform: translateY(25px);
  opacity: 0;

#app
  // font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  min-height 100vh
  width 100%
  background-color #DEF2EC
  position relative
  // font-family: 'Abril Fatface', cursive;
  font-family: 'Roboto', sans-serif;




html
  font-size: 62.5%; // 1rem = 10px



  h1
    font-size: 4.6rem;
    font-family: 'Abril Fatface', cursive;

  h2
    font-size: 2.2rem;

  h3
    font-size: 1.6rem;
    font-family: 'Abril Fatface', cursive;

  h4
    font-size: 1rem;

  p
    font-size: 1.4rem;

button
  font-family: 'Roboto', sans-serif;


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
