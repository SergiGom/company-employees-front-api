import { EmployeesTable } from "@/features/employees/components/employees-table";

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Empleados
        </h1>

        <p className="text-slate-500">
          Gestión de empleados
        </p>
      </div>

      <EmployeesTable />
    </div>
  );
}