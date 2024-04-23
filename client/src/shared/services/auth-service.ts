import { AuthResponse } from "@/shared/types";
import { AxiosResponse } from "axios";
import { $api } from "../lib/axios";

export class AuthService {
  static login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static registration(
    email: string,
    password: string,
    username: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", {
      email,
      password,
      username,
    });
  }

  static logout(): Promise<void> {
    return $api.post("/logout");
  }
}
