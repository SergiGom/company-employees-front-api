"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCompanies } from "@/features/companies/hooks/use-companies";

import {
  Employee,
} from "../types/employee.types";

import {
  employeeSchema,
  EmployeeFormValues,
} from "../schemas/employee.schema";

interface Props {
  employee?: Employee | null;
  isLoading?: boolean;
  onSubmit: (
    values: EmployeeFormValues
  ) => void;
}

export function EmployeeForm({
  employee,
  isLoading,
  onSubmit,
}: Props) {
  const { data: companies } =
    useCompanies();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
  });

  useEffect(() => {
    if (employee) {
      reset({
        nombre: employee.nombre,
        apellido: employee.apellido,
        correo: employee.correo,
        cargo: employee.cargo,
        salario: employee.salario,
        companiaId: employee.companiaId,
      });
    }
  }, [employee, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <input
        placeholder="Nombre"
        {...register("nombre")}
        className="w-full rounded-lg border p-3"
      />

      <input
        placeholder="Apellido"
        {...register("apellido")}
        className="w-full rounded-lg border p-3"
      />

      <input
        placeholder="Correo"
        {...register("correo")}
        className="w-full rounded-lg border p-3"
      />

      <input
        placeholder="Cargo"
        {...register("cargo")}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="number"
        placeholder="Salario"
        {...register("salario", {
          valueAsNumber: true,
        })}
        className="w-full rounded-lg border p-3"
      />

      <select
        {...register("companiaId", {
          valueAsNumber: true,
        })}
        className="w-full rounded-lg border p-3"
      >
        <option value="">
          Seleccione una compañía
        </option>

        {companies?.data.map(
          (company) => (
            <option
              key={company.id}
              value={company.id}
            >
              {company.nombre}
            </option>
          )
        )}
      </select>

      {(Object.keys(errors).length >
        0) && (
        <div className="text-sm text-red-500">
          Revise los campos.
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-slate-900 py-3 text-white"
      >
        {isLoading
          ? "Guardando..."
          : "Guardar"}
      </button>
    </form>
  );
}