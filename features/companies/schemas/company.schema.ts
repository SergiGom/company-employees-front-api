import { z } from "zod";

export const companySchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre debe tener mínimo 3 caracteres"),

  direccion: z
    .string()
    .min(3, "La dirección es obligatoria"),

  telefono: z
    .string()
    .min(7, "Teléfono inválido"),
});

export type CompanyFormValues =
  z.infer<typeof companySchema>;