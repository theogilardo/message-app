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
    name: "homepage",
    component: Homepage,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/chat",
    name: "chat",
    meta: { layout : 'chat'},
    component: UserChat,
    children: [
      {
        path:'/chat/:contact',
        name: "chat-contact",
        meta: { layout : 'chat'},
        component: UserChatContactMessages
      }
    ],

    beforeEnter(_, _2, next) {
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
