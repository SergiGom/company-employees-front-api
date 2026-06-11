"use client";

import { createContext } from "react";

import { UserProfile } from "../types/auth.types";

export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (
    user: UserProfile | null
  ) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(
    null
  );