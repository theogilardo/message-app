import Vue from "vue";
import VueRouter from "vue-router";
import TheHomepage from "../components/TheHomepage.vue";
import Signup from "../components/UserSignup.vue";
import Login from "../components/UserLogin.vue";
import UserChatbox from "../components/UserChatbox.vue";
import TheRouteError from "../components/TheRouteError.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: TheHomepage,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/chatbox",
    name: "Chatbox",
    component: UserChatbox,

    beforeEnter(to, from, next) {
      console.log(store.state.auth);
      if (localStorage.getItem("tokenId")) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "*",
    name: "404",
    component: TheRouteError,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
