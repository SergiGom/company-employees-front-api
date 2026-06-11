import { api } from "@/lib/api";

import {
  LoginDto,
  LoginResponse,
  UserProfile,
} from "../types/auth.types";

export async function login(
  data: LoginDto
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
}

export async function getProfile(): Promise<UserProfile> {
  const response = await api.get<UserProfile>(
    "/auth/profile"
  );

  return response.data;
}