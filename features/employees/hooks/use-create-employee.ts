"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createEmployee } from "../api/employees.api";


export function useCreateEmployee() {
const queryClient = useQueryClient();
return useMutation({
  mutationFn: createEmployee,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["employees"],
    });

    toast.success(
      "Empleado creado correctamente"
    );
  },

  onError: () => {
    toast.error(
      "Error creando Empleado"
    );
  },
});

}


