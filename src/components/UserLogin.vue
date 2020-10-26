<template>
  <div class="container">
    <form class="container__form">
      <h2>milo@gmail.com</h2>
      <div class="container__form__field">
        <input
          :class="{ error: emailError }"
          v-model="userData.email"
          v-validate="'required|email'"
          name="email"
          type="text"
          :placeholder="$t('login.placeholder.email')"
        />
        <label> {{ errors.first("email") }} </label>
      </div>
      <div class="container__form__field">
        <input
          :class="{ error: passwordError }"
          v-model="userData.password"
          v-validate="'required|min:6'"
          name="password"
          type="text"
          :placeholder="$t('login.placeholder.password')"
        />
        <label> {{ errors.first("password") }} </label>
      </div>
      <!-- <input type="email" placeholder="Enter phone.." /> -->
      <button class="btn" @click.prevent="formSubmitted">
        {{ $t("button.login") }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userData: {
        email: "",
        password: "",
        // phone: "",
      },
    };
  },
  computed: {
    emailError() {
      return this.$validator.errors.items.some(
        (error) => error.field === "email" && error.rule === "required"
      );
    },
    phoneError() {
      return this.$validator.errors.items.some(
        (error) => error.field === "phone" && error.rule === "required"
      );
    },
    passwordError() {
      return this.$validator.errors.items.some(
        (error) => error.field === "password" && error.rule === "required"
      );
    },
  },
  methods: {
    // formSubmitted() {
    //   this.$store.dispatch("login", this.userData);
    //   this.clearFields();
    //   this.redirectUser();
    // },
    formSubmitted() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.$store.dispatch("login", this.userData);
          this.clearFields();
          this.redirectUser();
        } else {
          return;
        }
      });
    },
    clearFields() {
      this.userData = {
        email: "",
        password: "",
        // phone: "",
      };
    },
    redirectUser() {
      return this.$router.push("/chatbox");
    },
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
    // background #ececec
    // border 1px solid #adadad
    background: linear-gradient(to right, rgba(74,210,149,1), rgba(77,125,225,1));
    // background-image linear-gradient(to right, #4c7de0, #e69cc0)
    display flex
    align-items center
    justify-content center
    flex-direction column

    h2
      margin-bottom 2.5rem
      color white
      // color #333

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
        // top 120%
        top 5.5rem
        left 0

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
