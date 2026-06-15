"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCompany } from "../api/companies.api";

export function useUpdateCompany() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: {
        nombre?: string;
        direccion?: string;
        telefono?: string;
      };
    }) =>
      updateCompany(id, data),

   onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["companies"],
  });

  toast.success(
    "Compañía actualizada"
  );
},

onError: () => {
  toast.error(
    "Error actualizando compañía"
  );
},
  });
}