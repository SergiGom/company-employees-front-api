"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/use-auth";

export function AppHeader() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

    router.push("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="font-semibold">
          Welcome
        </h2>

        <p className="text-sm text-slate-500">
          {user?.correo}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-lg border px-4 py-2"
      >
        Logout
      </button>
    </header>
  );
}