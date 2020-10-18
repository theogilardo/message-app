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
      <p>{{ user.name }}</p>
      <p>{{ user.surname }}</p>
    </div>
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
  border 1px solid red
  grid-row 1/2
  grid-column 1/2
  width 100%
  padding 3rem
  display flex
  align-items center
  justify-content space-between

  &__box
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position relative

    &__photo
      width: 80px;
      height: 80px;
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
    display flex
    align-items center
    justify-content center

    p
      padding .5rem
</style>
