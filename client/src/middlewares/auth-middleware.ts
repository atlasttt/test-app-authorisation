import { useAuthStore } from "@/modules/auth";
import { RouteLocationNormalized } from "vue-router";

export const authMiddleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.user) {
    return "/auth";
  }

  if (to.meta.requiresGuest && authStore.user) {
    return from.path;
  }
};
