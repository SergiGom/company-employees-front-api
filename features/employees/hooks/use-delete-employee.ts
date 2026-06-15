"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteEmployee } from "../api/employees.api";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,

    onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["employees"],
  });

  toast.success(
    "Empleado eliminado"
  );
},

onError: () => {
  toast.error(
    "Error eliminando Empleado"
  );
},
  });
}