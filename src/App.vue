<template>
  <div id="app">
    <the-navbar></the-navbar>
    <transition name="slide-fade">
      <router-view />
    </transition>
    <switch-trad></switch-trad>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";
import SwitchTrad from "./components/SwitchTrad";

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
    "switch-trad": SwitchTrad,
  },
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Paytone+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;1,100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,500&display=swap');
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
  font-family: 'Quicksand', sans-serif;

html
  font-size: 62.5%; // 1rem = 10px

  h1
    font-size: 4.6rem;
    // font-family: 'Abril Fatface', cursive;
    // font-family: 'Playfair Display', serif;
    font-family: 'Paytone One', sans-serif;
    // font-weight bold

  h2
    font-size: 2.2rem;

  h3
    font-size: 1.6rem;

  h4
    font-size: 1rem;

  p
    font-size: 1.4rem;
    font-weight 400



button
  font-family: 'Quicksand', sans-serif;
  font-weight 700


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

// Keyframes
@keyframes slide-up {
  0% {
    opacity 0
    transform translateY(-50px)
  }

  100% {
    opacity 1
    transform translateX(0)
  }
}

@keyframes slide-down {
  0% {
    opacity 0
    transform translateY(50px)
  }

  100% {
    opacity 1
    transform translateX(0)
  }
}

@keyframes fade-in {
  0% {
    opacity 0
  }

  100% {
    opacity 1
  }
}

@keyframes float {
	0% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-20px);
	}
	100% {
		transform: translateY(0px);
	}
}
</style>
