"use client";

import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { useAuth } from "@/features/auth/hooks/use-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <AppShell>
      {children}
    </AppShell>
  );
}