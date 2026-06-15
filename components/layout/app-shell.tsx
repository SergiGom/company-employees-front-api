"use client";

import { ReactNode } from "react";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

interface Props {
  children: ReactNode;
}

export function AppShell({
  children,
}: Props) {
 return (
  <div className="flex h-screen bg-slate-100">
    <AppSidebar />

    <div className="flex flex-1 flex-col overflow-hidden">
      <AppHeader />

      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  </div>
);
}