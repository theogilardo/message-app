<template>
  <div id="app">
    <the-navbar></the-navbar>
    <router-view />
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";

export default {
  created() {
    this.$store.dispatch("autoLogin");
  },
  components: {
    "the-navbar": TheNavbar,
  },
};
</script>

<style lang="stylus">

html
  font-size: 62.5%; // 1rem = 10px

  h1
    font-size: 4.8rem;

  h2
    font-size: 2.4rem;

  h3
    font-size: 1.8rem;

  h4
    font-size: 1.4rem;

  p
    font-size: 1.6rem;

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

input:focus
  outline: 0;
</style>
