"use client";

import { Employee } from "../types/employee.types";

import { EmployeeForm } from "./employee-form";

interface Props {
  open: boolean;
  title: string;
  employee?: Employee | null;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function EmployeeModal({
  open,
  title,
  employee,
  isLoading,
  onClose,
  onSubmit,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <EmployeeForm
          employee={employee}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}