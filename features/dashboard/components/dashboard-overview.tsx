"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { KpiCard } from "./kpi-card";

import { useDashboardStats } from "../hooks/use-dashboard-stats";

export function DashboardOverview() {
  const {
    stats,
    isLoading,
  } = useDashboardStats();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        title="Companies"
        value={stats.totalCompanies}
      />

      <KpiCard
        title="Employees"
        value={stats.totalEmployees}
      />

      <KpiCard
        title="Average Salary"
        value={`$${stats.averageSalary.toLocaleString()}`}
      />

      <KpiCard
        title="Highest Salary"
        value={`$${stats.maxSalary.toLocaleString()}`}
      />
    </div>
  );
}