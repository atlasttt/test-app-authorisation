import { AxiosResponse } from "axios";
import { User } from "../types";
import { $api } from "../lib/axios";

export class UserService {
  static async getUser(id: number): Promise<AxiosResponse<User>> {
    return $api.get<User>(`/users/${id}`);
  }

  static async getUsers(): Promise<AxiosResponse<User[]>> {
    return $api.get<User[]>("/users");
  }
}
