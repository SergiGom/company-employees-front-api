import { z } from "zod";

export const registerSchema =
  z
    .object({
      correo: z
        .email(
          "Correo inválido"
        ),

      password: z
        .string()
        .min(
          8,
          "Mínimo 8 caracteres"
        ),

      confirmPassword:
        z.string(),

      role: z.string(),

      ciudad: z.string(),
    })
    .refine(
      (data) =>
        data.password ===
        data.confirmPassword,
      {
        path: [
          "confirmPassword",
        ],
        message:
          "Las contraseñas no coinciden",
      }
    );

export type RegisterFormValues =
  z.infer<
    typeof registerSchema
  >;