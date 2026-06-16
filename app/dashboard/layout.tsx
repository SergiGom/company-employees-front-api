"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AppShell } from "@/components/layout/app-shell";
import { useAuth } from "@/features/auth/hooks/use-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router =
    useRouter();

  const {
    loading,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (
      !loading &&
      !isAuthenticated
    ) {
      router.replace(
        "/login"
      );
    }
  }, [
    loading,
    isAuthenticated,
    router,
  ]);

  if (
    loading ||
    !isAuthenticated
  ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <AppShell>
      {children}
    </AppShell>
  );
}