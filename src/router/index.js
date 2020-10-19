import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/HomePage.vue";
import Signup from "../components/UserSignup.vue";
import Login from "../components/UserLogin.vue";
import Chatbox from "../components/Chatbox.vue";
import ListMessages from "../components/ListMessages.vue";
import ListContacts from "../components/ListContacts.vue";
import NewContact from "../components/NewContact.vue";
// import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
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
    redirect: "/contacts",
    component: Chatbox,
    children: [
      { path: "/messages", component: ListMessages },
      { path: "/contacts", component: ListContacts },
      { path: "/new-contact", component: NewContact },
    ],
    // beforeEnter(to, from, next) {
    //   console.log(store.state.auth);
    //   if (localStorage.getItem("tokenId")) {
    //     next();
    //   } else {
    //     next("/login");
    //   }
    // },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
