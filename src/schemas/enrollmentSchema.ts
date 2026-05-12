import z from "zod/v4";

const createEnrollmentSchema = z.object({
  full_name: z.string().min(3).max(80),
  cpf: z.string().length(14),
  zip_code: z.string().length(9),
  plan: z.number().int().positive(),
  user: z.number().int().positive(),
  preferred_time: z.string().regex(/^\d{2}:\d{2}$/, "Formato esperado: HH:mm"),
  street: z.string().min(1).max(255),
  number: z.string().min(1).max(10),
  terms_accepted: z.boolean(),
  // Campos opcionais (introduzidos com a expansão do cadastro):
  email: z.string().email().max(255).optional(),
  phone: z.string().min(10).max(11).optional(),
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (esperado: YYYY-MM-DD)")
    .optional(),
  complement: z.string().max(60).optional().or(z.literal("")),
  neighborhood: z.string().max(80).optional(),
  city: z.string().max(80).optional(),
  state: z.string().length(2).optional(),
});

export { createEnrollmentSchema };
