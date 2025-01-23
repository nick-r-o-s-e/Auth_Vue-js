import {
  createRouter,
  createWebHistory,
} from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/Auth/RegisterView.vue";
import LoginView from "../views/Auth/LoginView.vue";
import ForgotPasswordView from "@/views/PasswordReset/ForgotPasswordView.vue";
import ResetPasswordVue from "@/views/PasswordReset/ResetPassword.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { auth: true },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { guest: true },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPasswordView,
      meta: { guest: true },
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPasswordVue,
      props: (route) => ({
        token: route.query.token,
      }),
      beforeEnter: (to) => {
        if (!to.query.token) {
          return { name: "home" };
        }
        return true;
      },
      meta: { guest: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { guest: true },
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  await authStore.getUser();

  if (authStore.user && to.meta.guest) {
    return { name: "home" };
  }

  if (!authStore.user && to.meta.auth) {
    return { name: "login" };
  }
});
export default router;
