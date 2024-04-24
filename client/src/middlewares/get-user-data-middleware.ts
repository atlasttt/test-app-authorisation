import { useAuthStore } from "@/modules/auth";

export const getUserDatamiddleware = async () => {
  const authStore = useAuthStore();
  try {
    await authStore.getMe();
  } catch (error) {}
  return true;
};
