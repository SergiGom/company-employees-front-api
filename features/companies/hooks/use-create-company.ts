"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCompany } from "../api/companies.api";

export function useCreateCompany() {
  const queryClient =
    useQueryClient();

  return useMutation({
  mutationFn: createCompany,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["companies"],
    });

    toast.success(
      "Compañía creada correctamente"
    );
  },

  onError: () => {
    toast.error(
      "Error creando compañía"
    );
  },
});
}