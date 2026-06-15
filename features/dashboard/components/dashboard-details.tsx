"use client";

import { DashboardCard } from "./dashboard-card";

import { useCompanies } from "@/features/companies/hooks/use-companies";
import { useEmployees } from "@/features/employees/hooks/use-employees";

export function DashboardDetails() {
  const companiesQuery =
    useCompanies();

  const employeesQuery =
    useEmployees();

  const employees =
    employeesQuery.data?.data ?? [];

  const companies =
    companiesQuery.data?.data ?? [];

  const topSalaries = [...employees]
    .sort(
      (a, b) =>
        b.salario - a.salario
    )
    .slice(0, 5);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <DashboardCard title="Últimos empleados">
        <div className="space-y-3">
          {employees
            .slice(-5)
            .reverse()
            .map((employee) => (
              <div
                key={employee.id}
                className="rounded-lg border p-3"
              >
                <p className="font-medium">
                  {employee.nombre}{" "}
                  {employee.apellido}
                </p>

                <p className="text-sm text-slate-500">
                  {employee.cargo}
                </p>
              </div>
            ))}
        </div>
      </DashboardCard>

      <DashboardCard title="Últimas compañías">
        <div className="space-y-3">
          {companies
            .slice(-5)
            .reverse()
            .map((company) => (
              <div
                key={company.id}
                className="rounded-lg border p-3"
              >
                <p className="font-medium">
                  {company.nombre}
                </p>

                <p className="text-sm text-slate-500">
                  {company.direccion}
                </p>
              </div>
            ))}
        </div>
      </DashboardCard>

      <DashboardCard title="Top salarios">
        <div className="space-y-3">
          {topSalaries.map(
            (employee) => (
              <div
                key={employee.id}
                className="rounded-lg border p-3"
              >
                <p className="font-medium">
                  {employee.nombre}{" "}
                  {employee.apellido}
                </p>

                <p className="text-sm text-slate-500">
                  {employee.cargo}
                </p>

                <p className="mt-1 font-semibold text-green-600">
                  $
                  {employee.salario.toLocaleString()}
                </p>
              </div>
            )
          )}
        </div>
      </DashboardCard>
    </div>
  );
}