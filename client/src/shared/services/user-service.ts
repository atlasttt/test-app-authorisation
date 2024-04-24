import { AxiosResponse } from "axios";
import { User } from "../types";
import { $api } from "../lib/axios";

export class UserService {
  static deleteUser(id: number) {
    return $api.delete(`/users/${id}`);
  }
  static updateProfile(id: number, username: string) {
    return $api.patch<User>(`/users/${id}`, { username });
  }
  static logout() {
    return $api.post("/logout");
  }
  static async getMe(): Promise<AxiosResponse<User>> {
    return $api.get<User>(`/users/me`);
  }

  static async getUsers(): Promise<AxiosResponse<User[]>> {
    return $api.get<User[]>("/users");
  }
}
