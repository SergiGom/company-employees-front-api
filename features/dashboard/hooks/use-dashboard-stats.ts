"use client";

import { useMemo } from "react";

import { useCompanies } from "@/features/companies/hooks/use-companies";
import { useEmployees } from "@/features/employees/hooks/use-employees";

export function useDashboardStats() {
  const companiesQuery =
    useCompanies();

  const employeesQuery =
    useEmployees();

  const stats = useMemo(() => {
    const companies =
      companiesQuery.data?.data ?? [];

    const employees =
      employeesQuery.data?.data ?? [];

   const totalCompanies =
  companiesQuery.data?.total ?? 0;

const totalEmployees =
  employeesQuery.data?.total ?? 0;

    const salaries =
      employees.map(
        (employee) =>
          employee.salario
      );

    const averageSalary =
      salaries.length > 0
        ? salaries.reduce(
            (acc, salary) =>
              acc + salary,
            0
          ) / salaries.length
        : 0;

    const maxSalary =
      salaries.length > 0
        ? Math.max(...salaries)
        : 0;

    return {
      totalCompanies,
      totalEmployees,
      averageSalary,
      maxSalary,
    };
  }, [
    companiesQuery.data,
    employeesQuery.data,
  ]);

  return {
    stats,
    isLoading:
      companiesQuery.isLoading ||
      employeesQuery.isLoading,
  };
}