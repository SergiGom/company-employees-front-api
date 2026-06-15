import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";
import { DashboardDetails } from "@/features/dashboard/components/dashboard-details";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-500">
          Resumen general del sistema
        </p>
      </div>

      <DashboardOverview />

      <DashboardDetails />
    </div>
  );
}