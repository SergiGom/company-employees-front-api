"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AuthContext } from "./auth-context";
import { getProfile } from "../api/auth.api";
import { UserProfile } from "../types/auth.types";

import {
  getToken,
  removeToken,
} from "@/lib/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const loadUser = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const profile = await getProfile();

      setUser(profile);
    } catch (error) {
      console.error(error);

      removeToken();

      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const logout = useCallback(() => {
    removeToken();

    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      setUser,
      logout,
      isAuthenticated: !!user,
    }),
    [user, loading, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}