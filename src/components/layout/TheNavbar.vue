<template>
  <div 
    v-if="!isPathChat" 
    class="navbar"
  >
    <router-link to="/">
      <img 
        class="navbar__img" 
        src="../../assets/logo.png" 
        alt="logo-icon" 
      />
    </router-link>
    <div>
      <router-link 
        v-if="!isAuth" 
        class="link" 
        to="/login">
          {{ $t("button.login") }}
      </router-link>
      <router-link 
        v-if="!isAuth" 
        class="link" 
        to="/signup">
          {{ $t("button.signup") }}
      </router-link>
      <router-link 
        v-if="isAuth" 
        class="link" 
        to="/chat">
          {{ $t("button.chat") }}
      </router-link>
      <button 
        v-if="isAuth" 
        class="link" 
        @click="logoutAndRedirect">
          {{ $t("button.logout") }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters([
      "isAuth"
    ]),
    isPathChat() {
      return this.$route.name === "chat";
    },
  },
  methods: {
    ...mapMutations({
      logout: 'logout'
    }),
    logoutAndRedirect () {
      this.redirectHome();
      this.logout();
    },
    redirectHome () {
      return this.$router.push("/");
    },
  },
};
</script>

<style lang="stylus" scoped>

.navbar
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  height 5rem
  max-width: 1366px;
  position: fixed;
  z-index: 1000;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);

  &__img
    width: 55px;
    transform: translateX(-7px);

  div
    display: flex;

    & > *
      margin: 0 1rem;
      font-size 1.6rem
      text-decoration none
      color white
      padding: .8rem 1.8rem;
      border: none;
      background: linear-gradient(to right, rgba(74,210,149,1), rgba(77,125,225,1));
      border-radius: 15px;
      font-weight: 600;
      box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: all 0.5s;

      &:hover
        transform: translateY(-2px);
</style>
