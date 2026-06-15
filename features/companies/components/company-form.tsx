"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  companySchema,
  CompanyFormValues,
} from "../schemas/company.schema";

import { Company } from "../types/company.types";

interface Props {
  company?: Company | null;
  isLoading?: boolean;
  onSubmit: (
    values: CompanyFormValues
  ) => void;
}

export function CompanyForm({
  company,
  isLoading,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      nombre: "",
      direccion: "",
      telefono: "",
    },
  });

  useEffect(() => {
    if (company) {
      reset({
        nombre: company.nombre,
        direccion: company.direccion,
        telefono: company.telefono,
      });
    }
  }, [company, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Nombre
        </label>

        <input
          {...register("nombre")}
          className="w-full rounded-lg border p-3"
        />

        {errors.nombre && (
          <p className="mt-1 text-sm text-red-500">
            {errors.nombre.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Dirección
        </label>

        <input
          {...register("direccion")}
          className="w-full rounded-lg border p-3"
        />

        {errors.direccion && (
          <p className="mt-1 text-sm text-red-500">
            {errors.direccion.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Teléfono
        </label>

        <input
          {...register("telefono")}
          className="w-full rounded-lg border p-3"
        />

        {errors.telefono && (
          <p className="mt-1 text-sm text-red-500">
            {errors.telefono.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-slate-900 px-4 py-3 text-white disabled:opacity-50"
      >
        {isLoading
          ? "Guardando..."
          : "Guardar"}
      </button>
    </form>
  );
}