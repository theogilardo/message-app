import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../pages/Homepage.vue";
import Signup from "../pages/auth/UserSignup.vue";
import Login from "../pages/auth/UserLogin.vue";
import UserChat from "../pages/chat/UserChat.vue";
import UserChatContactMessages from "../components/chat/UserChatContactMessages.vue";
import NotFound from "../pages/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
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
    path: "/chat",
    name: "Chat",
    component: UserChat,
    children: [
      {
        name: "ChatContact",
        path:'/chat/:contact',
        component: UserChatContactMessages
      }
    ],

    beforeEnter(to, from, next) {
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
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
