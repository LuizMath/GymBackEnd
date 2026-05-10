import z from "zod/v4";

const createEnrollmentSchema = z.strictObject({
  full_name: z.string(),
  cpf: z.string().length(14),
  zip_code: z.string().length(9),
  plan: z.number(),
  user: z.number(),
  preferred_time: z.string(),
  street: z.string(),
  number: z.string().max(9),
  terms_accepted: z.boolean(),
});

export { createEnrollmentSchema };
