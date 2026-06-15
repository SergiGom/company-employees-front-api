"use client";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/use-auth";

export function AppHeader() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

    router.push("/login");
  };

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-xl font-semibold">
          Welcome Back
        </h2>

        <p className="text-sm text-slate-500">
          Manage your companies and employees
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium">
            {user?.correo}
          </p>

          <div className="flex justify-end gap-2 text-xs text-slate-500">
            <span>
              {user?.role}
            </span>

            <span>•</span>

            <span>
              {user?.ciudad}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-slate-100"
        >
          <LogOut size={16} />

          Logout
        </button>
      </div>
    </header>
  );
}