import { z } from "zod";
//Define o formato dos dados e as regras de validação
export const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido")
});
export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional()
}).refine(data => data.name || data.email, {
  message: "Informe ao menos um campo para atualizar"
});

export const userIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser numérico")
    .transform(Number)
});