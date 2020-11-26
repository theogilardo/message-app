import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../pages/Homepage.vue";
import Signup from "../pages/auth/UserSignup.vue";
import Login from "../pages/auth/UserLogin.vue";
import UserChat from "../pages/chat/UserChat.vue";
import UserChatContactMessages from "../components/chat/UserChatContactMessages.vue";
import NotFound from "../pages/NotFound.vue";
import store from "../store"

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
    meta: { 
      layout : 'chat',
      requiresAuth: true
    },
    component: UserChat,
    children: [
      {
        path:'/chat/:contact',
        name: "chat-contact",
        meta: { 
          layout : 'chat',
          requiresAuth: true
        },
        component: UserChatContactMessages
      }
    ],
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

router.beforeEach((to, _, next) => {
  const recentContact = store.getters.contact || null
  const isAuth = localStorage.getItem("tokenId")
  
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (isAuth && to.name === "chat" && recentContact) {
      return next('/chat/' + recentContact.name) 
    } 

    if (isAuth) {
      return next()
    }
    return next('/login')
  }
  next()
})

export default router;
