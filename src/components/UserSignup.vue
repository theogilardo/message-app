<template>
  <div class="container">
    <form class="container__form">
      <div class="container__form__label">
        <h2>{{ $t("signup.title") }}</h2>
      </div>

      <div class="container__form__photo">
        <div class="container__form__photo__circle">
          <img :src="profilePicDOM" alt="" />
          <p
            v-if="!userData.profilePic"
            class="container__form__photo__circle__label"
          >
            + Add photo <br />
            here
          </p>
          <input
            v-validate="'required'"
            id="file"
            class="container__form__photo__upload"
            name="image"
            type="file"
            ref="myFiles"
            @change="onFileSelected"
          />
          <label class="container__form__photo__circle__error">
            {{ errors.first("image") }}
          </label>
        </div>
      </div>

      <div class="container__form__input">
        <div class="container__form__field container__form__input__appelation">
          <div class="container__form__input__appelation__error">
            <input
              v-validate="'required'"
              v-model="userData.name"
              :class="{ error: errors.has('name') }"
              :placeholder="$t('signup.placeholder.name')"
              name="name"
              type="text"
            />
            <label class="container__form__input__appelation__error__label">
              {{ errors.first("name") }}
            </label>
          </div>
          <div>
            <div class="container__form__input__appelation__error">
              <input
                v-validate="'required'"
                v-model="userData.surname"
                :class="{ error: errors.has('surname') }"
                :placeholder="$t('signup.placeholder.surname')"
                name="surname"
                type="text"
              />
              <label class="container__form__input__appelation__error__label">
                {{ errors.first("surname") }}
              </label>
            </div>
          </div>
        </div>
        <div class="container__form__field">
          <input
            v-validate="'required|regex:^([0-9]+)$'"
            v-model="userData.phone"
            :class="{ error: phoneError }"
            :placeholder="$t('signup.placeholder.phone')"
            name="phone"
            type="text"
          />
          <label> {{ errors.first("phone") }} </label>
        </div>
        <div class="container__form__field">
          <input
            v-validate="'required|email'"
            v-model="userData.email"
            :class="{ error: emailError }"
            :placeholder="$t('signup.placeholder.email')"
            name="email"
            type="text"
          />
          <label> {{ errors.first("email") }} </label>
        </div>
        <div class="container__form__field">
          <input
            v-validate="'required|min:6'"
            v-model="userData.password"
            :class="{ error: passwordError }"
            :placeholder="$t('signup.placeholder.password')"
            name="password"
            type="text"
          />
          <label> {{ errors.first("password") }} </label>
        </div>
      </div>
      <div class="container__form__btn">
        <button class="btn" type="submit" @click.prevent="formSubmitted">
          {{ $t("button.signup") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      userData: {
        name: "",
        surname: "",
        email: "",
        phone: "",
        profilePic: null,
      },
    };
  },
  computed: {
    profilePicDOM() {
      if (!this.userData.profilePic) {
        return require("@/assets/default-user.png");
      }
      return this.userData.profilePic;
    },
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
    formSubmitted() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.$store.dispatch("signup", this.userData);
        } else {
          alert("Form not valid");
        }
      });
    },
    onFileSelected(event) {
      let file = event.target.files[0];
      var storageRef = firebase.storage().ref("profile-pics/" + file.name);
      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
          // let bytesTransferred = snapshot.bytesTransferred;
          // let totalBytes = snapshot.totalBytes;
          // this.loading = Math.round((bytesTransferred / totalBytes) * 100);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.userData.profilePic = downloadURL;
          });
        }
      );
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
    padding 2rem 2rem 2rem 3rem
    width 100%
    max-width 75rem
    height 48rem
    position relative
    border-radius 20px
    background: linear-gradient(to right, rgba(74,210,149,1), rgba(77,125,225,1));
    display grid
    grid-template-rows 5rem 1fr 5rem
    grid-template-columns 30% 1fr
    // flex-direction column

    &__label
      color white
      grid-row 1 / 2
      grid-column 1 / -1
      display flex
      align-items center
      justify-content center

    &__photo
        width 100%
        height 100%
        position relative
        grid-row 2 / 5
        grid-column 1 / 2
        padding-bottom 2rem
        display flex
        align-items center
        justify-content center

        img
          width 100%
          height 100%
          object-fit cover
          border-radius 50%

        &__circle
          position relative
          width 15rem
          height 15rem
          background white
          border 1px solid white
          border-radius 50%

          &__label
            position absolute
            color white
            top 0
            left 0
            width 100%
            height 100%
            display flex
            align-items center
            justify-content center
            background #404040a6
            z-index 200
            border-radius 50%

          &__error
            position: absolute;
            top: 115%;

        &__upload
          position absolute
          z-index 500
          top 50%
          left 50%
          transform translate(-50%, -50%) scale(2)
          opacity 0

    &__input
      grid-row 1 / 4
      grid-column 2 / 3
      margin-top 4rem
      display flex
      align-items center
      justify-content center
      flex-direction column

      &__appelation
        display flex
        align-items center
        justify-content space-between
        margin-bottom 3rem
        width 100%

        &__error
          position relative

          &__label
            position absolute

        div
          width 100%

          &:first-child
            margin-right 2rem

    &__field
        width 70%
        position relative

        &:not(:last-child)
          margin-bottom 3.5rem

    &__btn
      grid-row 4 / 5
      grid-column 1 / -1
      display flex
      align-items center
      justify-content center

    .btn
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

input
  padding 1.2rem
  width 100%
  border none
  border-radius 5px

label
  position absolute
  color red
  font-size 1.1rem
  width 100%
  top 5rem
  left 0
</style>
