import { api } from "@/lib/api";

import {
  LoginDto,
  LoginResponse,
  UserProfile,
} from "../../auth/types/auth.types";

import { RegisterDto } from "../types/register.types";

export async function login(
  data: LoginDto
): Promise<LoginResponse> {
  const response =
    await api.post<LoginResponse>(
      "/auth/login",
      data
    );

  return response.data;
}

export async function getProfile(): Promise<UserProfile> {
  const response =
    await api.get<UserProfile>(
      "/auth/profile"
    );

  return response.data;
}

export async function register(
  data: RegisterDto
) {
  const response =
    await api.post(
      "/auth/register",
      data
    );

  return response.data;
}