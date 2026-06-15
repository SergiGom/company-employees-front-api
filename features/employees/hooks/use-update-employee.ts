"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateEmployee } from "../api/employees.api";

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: {
        nombre?: string;
        apellido?: string;
        correo?: string;
        cargo?: string;
        salario?: number;
        companiaId?: number;
      };
    }) => updateEmployee(id, data),

   onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["employees"],
  });

  toast.success(
    "Empleado actualizado"
  );
},

onError: () => {
  toast.error(
    "Error actualizando empleado"
  );
},
  });
}