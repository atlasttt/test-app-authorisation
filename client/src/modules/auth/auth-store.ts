import { $api } from "@/shared/lib/axios";
import { defineStore } from "pinia";
import { AuthService } from "@/shared/services/auth-service";
import { ref } from "vue";
import { User } from "@/shared/types";
import { UserService } from "@/shared/services/user-service";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await AuthService.login(email, password);
    localStorage.setItem("token", response.data.accessToken);
    user.value = response.data.user;
  };

  const registration = async (
    email: string,
    password: string,
    username: string
  ) => {
    const response = await AuthService.registration(email, password, username);
    localStorage.setItem("token", response.data.accessToken);
    user.value = response.data.user;
  };

  const getMe = async () => {
    const response = await UserService.getMe();
    user.value = response.data || null;
  };

  const updateProfile = async (username: string) => {
    const id = user.value?.id;
    if (!id) return;
    await UserService.updateProfile(id, username);
    await getMe();
  };

  const logout = async () => {
    $api.post("/logout");
    localStorage.removeItem("token");
    user.value = null;
  };

  const deleteProfile = async () => {
    const id = user.value?.id;
    if (!id) return;

    await UserService.deleteUser(id);
    user.value = null;
  };

  return {
    user,
    login,
    registration,
    getMe,
    updateProfile,
    logout,
    deleteProfile,
  };
});
