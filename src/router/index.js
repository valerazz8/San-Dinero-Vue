import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CharacterView from "../views/CharacterView.vue"
import LoginView from "../views/account/LoginView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/character",
      name: "character",
      component: CharacterView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
  ],
});

export default router;
