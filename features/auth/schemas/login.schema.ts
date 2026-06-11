import { z } from "zod";

export const loginSchema = z.object({
  correo: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Correo inválido"),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria"),
});

export type LoginFormData = z.infer<typeof loginSchema>;