<template>
  <div class="user-profile">
    <div class="user-profile__box">
      <img
        class="user-profile__box__photo"
        :src="availableProfilePic"
        alt="box"
      />
      <label v-if="!profilePic" for="file"
        >Add<br />
        Picture</label
      >
    </div>
    <input type="file" id="file" ref="myFiles" @change="onFileSelected" />

    <div class="user-profile__name">
      <h2>{{ user.name }}</h2>
      <h2>{{ user.surname }}</h2>
    </div>
    <p>My account</p>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "userProfile",
  data() {
    return {
      profilePic: null,
      defaultImg: require("@/assets/default-user.png"),
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    availableProfilePic() {
      return this.profilePic ? this.profilePic : this.defaultImg;
    },
  },
  methods: {
    onFileSelected(event) {
      let file = event.target.files[0];
      console.log(event.target.files[0]);
      var storageRef = firebase.storage().ref("profile-pics/" + file.name);
      let uploadTask = storageRef.put(file);

      uploadTask.on("state_changed", () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.profilePic = downloadURL;
        });
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.user-profile
  background #fdfdfd
  grid-row 1/3
  grid-column 2/3
  width 100%
  padding 3rem
  display flex
  align-items center
  // justify-content space-between
  flex-direction column

  &__box
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position relative

    &__photo
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit cover

    label
      position absolute
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #33333373;
      border-radius: 50%;
      color: white;
      font-size: 14px;
      font-weight: 700;

      top 50%
      left 50%
      transform translate(-50%, -50%)

  input[type="file"]
    opacity: 0;
    position: absolute;
    z-index: -10;

  &__name
    margin-top 3rem
    display flex
    align-items center
    justify-content center

    h2
      font-weight 700
      padding .5rem
</style>
