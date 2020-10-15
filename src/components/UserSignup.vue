<template>
  <div class="container">
    <form class="container__form">
      <h2>Please Signup</h2>
      <div class="container__form__field">
        <input
          :class="{ error: errors.has('name') }"
          v-model="userData.name"
          v-validate="'required'"
          name="name"
          type="text"
          placeholder="Enter name..."
        />
        <label> {{ errors.first("name") }} </label>
      </div>
      <div class="container__form__field">
        <input
          :class="{ error: errors.has('surname') }"
          v-model="userData.surname"
          v-validate="'required'"
          name="surname"
          type="text"
          placeholder="Enter surname..."
        />
        <label> {{ errors.first("surname") }} </label>
      </div>
      <div class="container__form__field">
        <input
          :class="{ error: errors.has('email') }"
          v-model="userData.email"
          v-validate="'required|email'"
          name="email"
          type="email"
          placeholder="Enter email..."
        />
        <label> {{ errors.first("email") }} </label>
      </div>
      <div class="container__form__field">
        <input
          :class="{ error: errors.has('password') }"
          v-model="userData.password"
          v-validate="'required'"
          name="password"
          type="text"
          placeholder="Enter password..."
        />
        <label> {{ errors.first("password") }} </label>
      </div>
      <div class="container__form__field">
        <input
          :class="{ error: errors.has('phone') }"
          v-model="userData.phone"
          v-validate="'required|regex:^([0-9]+)$'"
          name="phone"
          type="text"
          placeholder="Enter phone..."
        />
        <label> {{ errors.first("phone") }} </label>
      </div>
      <button class="btn" type="submit" @click.prevent="formSubmitted">
        Signup
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      userData: {
        name: "",
        surname: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    formSubmitted() {
      console.log(this.$validator);

      this.$validator
        .validateAll()
        .then((res) => {
          console.log(res);
          // this.$store.dispatch("signup", this.userData);
          // this.clearFields();
          // this.redirectUser();
        })
        .catch((err) => {
          console.log(err);
          alert("Invalid fields");
        });
    },
    clearFields() {
      this.userData = {
        name: "",
        surname: "",
        email: "",
        phone: "",
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
    padding 2rem
    width 70%
    max-width 55rem
    border-radius 20px
    background #ececec
    border 1px solid #adadad
    // background-image linear-gradient(to right, #4c7de0, #e69cc0)
    display flex
    align-items center
    justify-content center
    flex-direction column

    h2
      margin 2rem 0 3rem 0
      color #333

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
      margin-bottom: 1.5rem;
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
