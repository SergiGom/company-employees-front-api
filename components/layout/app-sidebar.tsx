"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

const links = [
  {
    href: "/",
    label: "Dashboard",
  },
  {
    href: "/companies",
    label: "Companies",
  },
  {
    href: "/employees",
    label: "Employees",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">
          Company Hub
        </h1>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "rounded-lg px-4 py-3 transition",
              pathname === link.href
                ? "bg-slate-900 text-white"
                : "hover:bg-slate-100"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}