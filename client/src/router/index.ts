import { authMiddleware } from "@/middlewares/auth-middleware";
import { getUserDatamiddleware } from "@/middlewares/get-user-data-middleware";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "",
        component: () => import("@/pages/Home.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "auth",
        component: () => import("@/pages/Auth.vue"),
        meta: { requiresGuest: true },
      },
      {
        path: "profile",
        component: () => import("@/pages/Profile.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  // not found page
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(getUserDatamiddleware);
router.beforeEach(authMiddleware);

export default router;
