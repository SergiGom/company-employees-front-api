"use client";

import { Employee } from "@/features/employees/types/employee.types";

interface Props {
  open: boolean;
  companyName: string;
  employees: Employee[];
  onClose: () => void;
}

export function CompanyEmployeesModal({
  open,
  companyName,
  employees,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Empleados de {companyName}
          </h2>

          <button
            onClick={onClose}
            className="rounded border px-3 py-1"
          >
            Cerrar
          </button>
        </div>

        <div className="space-y-3">
          {employees.length === 0 ? (
            <p className="text-slate-500">
              Esta compañía no tiene empleados.
            </p>
          ) : (
            employees.map(
              (employee: Employee) => (
                <div
  key={employee.id}
  className="rounded-lg border p-4"
>
  <div className="flex items-start justify-between">
    <div>
      <p className="font-medium">
        {employee.nombre}{" "}
        {employee.apellido}
      </p>

      <p className="text-sm text-slate-500">
        {employee.cargo}
      </p>

      <p className="text-sm text-slate-500">
        {employee.correo}
      </p>
    </div>

    <div>
      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
        $
        {Number(
          employee.salario
        ).toLocaleString()}
      </span>
    </div>
  </div>
</div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}