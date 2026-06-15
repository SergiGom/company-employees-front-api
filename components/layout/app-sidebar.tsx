"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import {
  Building2,
  LayoutDashboard,
  Users,
} from "lucide-react";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    href: "/dashboard/companies",
    label: "Companies",
    icon: Building2,
  },

  {
    href: "/dashboard/employees",
    label: "Employees",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-72 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Company Hub
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Employee Management
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all",

                pathname === link.href
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Icon size={18} />

              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}