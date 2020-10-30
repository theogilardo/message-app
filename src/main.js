import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";
import firebase from "firebase";
import i18n from "./i18n";
import Toasted from "vue-toasted";

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(Toasted);

Vue.filter("setTimeHourMinutes", (messageObj) => {
  const objLength = messageObj.length - 1;
  const lastTimestamp = messageObj[objLength].timestamp;
  const date = new Date(lastTimestamp);
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  const formattedTime = `${hours}:${minutes.substr(-2)}`;
  return formattedTime;
});

Vue.filter("sliceMessage", (messageObj) => {
  const objLength = messageObj.length - 1;
  return messageObj[objLength].message.slice(0, 14) + "..";
});

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCGkv9-83v6LsQRhClROTowTL6rK5YcPI8",
  authDomain: "message-app-719f5.firebaseapp.com",
  databaseURL: "https://message-app-719f5.firebaseio.com",
  projectId: "message-app-719f5",
  storageBucket: "message-app-719f5.appspot.com",
  messagingSenderId: "114576309871",
  appId: "1:114576309871:web:bc8e8f4dfdee99f352d79a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
