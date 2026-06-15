import { z } from "zod";

export const employeeSchema = z.object({
  nombre: z.string().min(2),

  apellido: z.string().min(2),

  correo: z.string().email(),

  cargo: z.string().min(2),

  salario: z.number().positive(),

  companiaId: z.number().positive(),
});

export type EmployeeFormValues =
  z.infer<typeof employeeSchema>;