import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [{ path: "", component: () => import("@/pages/Home.vue") }],
  },
  {
    path: "/auth",
    component: () => import("@/layouts/empty.vue"),
    children: [{ path: "", component: () => import("@/pages/Auth.vue") }],
  },
  // not found page
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
