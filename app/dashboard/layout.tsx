"use client";

import { redirect } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
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
  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
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