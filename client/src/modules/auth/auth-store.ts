import { $api } from "@/shared/lib/axios";
import { defineStore } from "pinia";
import { AuthService } from "@/shared/services/auth-service";
import { ref } from "vue";
import { User } from "@/shared/types";

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

  const logout = async () => {
    $api.post("/logout");
    localStorage.removeItem("token");
    user.value = null;
  };

  return { login, registration, logout };
});
