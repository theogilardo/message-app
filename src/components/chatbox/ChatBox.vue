<template>
  <div class="container">
    <div class="container__user-profile">
      <div class="container__form__field">
        <label for="file">Add a photo</label>
        <img :src="profilePic" alt="" />
        <div>
          <input type="file" id="file" ref="myFiles" @change="onFileSelected" />
        </div>
        <p>{{ user }}</p>
      </div>
    </div>
    <div class="container__contacts-list">
      <h3>contacts-list here</h3>
    </div>
    <div class="container__contact-info">
      <h3>contact-info here</h3>
    </div>
    <div class="container__messages">
      <h3>Messages here</h3>
    </div>
    <div class="container__typing">
      <h3>Typing here</h3>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Chatbox",
  data() {
    return {
      profilePic: null,
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  methods: {
    onFileSelected(event) {
      let file = event.target.files[0];
      console.log(event.target.files[0]);
      var storageRef = firebase.storage().ref("profile-pics/" + file.name);
      let uploadTask = storageRef.put(file);
      // let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
          let bytesTransferred = snapshot.bytesTransferred;
          let totalBytes = snapshot.totalBytes;
          this.loading = Math.round((bytesTransferred / totalBytes) * 100);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.profilePic = downloadURL;
          });
        }
      );
    },
  },
};
</script>

<style lang="stylus" scoped>

.container
  margin-top 10rem
  width 100%
  min-height 100vh
  display: grid;
  grid-template-columns: 25% 1fr;
  grid-template-rows: 100px 1fr 100px;

  &__user-profile
    border 1px solid red
    grid-row 1/2
    grid-column 1/2

  &__contacts-list
    border 1px solid blue
    grid-row 2/4
    grid-column 1/2

  &__contact-info
    border 1px solid green
    grid-row 1/2
    grid-column 2/3

  &__messages
    border 1px solid purple
    grid-row 2/3
    grid-column 2/3

  &__typing
    border 1px solid yellow
    grid-row 3/4
    grid-column 2/3
</style>
