"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCompany } from "../api/companies.api";

export function useDeleteCompany() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteCompany,

    onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["companies"],
  });

  toast.success(
    "Compañía eliminada"
  );
},

onError: () => {
  toast.error(
    "Error eliminando compañía"
  );
},
  });
}