import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export function DashboardCard({
  title,
  children,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">
        {title}
      </h3>

      {children}
    </div>
  );
}