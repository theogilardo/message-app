<template>
  <div class="container">
    <form class="container__form">
      <h2>Please login</h2>
      <div class="container__form__field">
        <input
          v-validate="'required|email'"
          v-model="userData.email"
          :class="{ error: errors.has('email') }"
          :placeholder="$t('login.placeholder.email')"
          name="email"
          type="text"
        />
        <label>{{ errors.first("email") }}</label>
      </div>
      <div class="container__form__field">
        <input
          v-validate="'required|min:6'"
          v-model="userData.password"
          :class="{ error: errors.has('password') }"
          :placeholder="$t('login.placeholder.password')"
          name="password"
          :type="inputType"
        />
        <img 
          :src="iconPasswordVisibility" 
          class="container__form__field__icon" 
          alt="Eye icon"
          @click="togglePasswordVisibility"
        >
        <label>{{ errors.first("password") }}</label>
      </div>
      <button class="btn" @click.prevent="formSubmitted">
        {{ $t("button.login") }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      inputType: "password",
      iconPasswordVisibility: require("@/assets/eye-password.svg"),
      userData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions([
      "login"
    ]),
    formSubmitted () {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.login(this.userData);
        } else {
          alert("Form not valid");
          return;
        }
      });
    },
    togglePasswordVisibility () {
      this.inputType = this.inputType === "password" ? "text" : "password"
      this.iconPasswordVisibility = require(`@/assets/eye-${this.inputType}.svg`)
    }
  },
};
</script>

<style lang="stylus" scoped>

.error
  border: 1px solid rgb(241, 87, 87) !important;

.container
  width 100%
  min-height 100vh
  display flex
  align-items center
  justify-content center

  &__form
    margin-top 8rem
    padding 5rem 2rem
    width 70%
    max-width 55rem
    border-radius 20px
    background: linear-gradient(to right, rgba(74,210,149,1), rgba(77,125,225,1));
    display flex
    align-items center
    justify-content center
    flex-direction column

    h2
      margin-bottom 2.5rem
      color white

    &__field
      width 100%
      position relative

      &:not(:first-child)
        margin-bottom 3.5rem

      input
        padding 1.5rem
        width 55%
        border none
        border-radius 5px

      label
        position absolute
        color red
        font-size 1.1rem
        width 100%
        top 5.5rem
        left 0

      &__icon
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        top: 50%;
        right: 12.5rem;
        transform: translateY(-50%);
        opacity: .8;

    .btn
      margin-top 1rem
      font-size 1.6rem
      padding: 1.5rem 2.5rem;
      border: none;
      color: white;
      background-color: #5ba95b;
      border-radius: 15px;
      text-transform: uppercase;
      font-weight: 700;
      box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: all 0.5s;

      &:hover
        transform: translateY(-2px);
</style>
