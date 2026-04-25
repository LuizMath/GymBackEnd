import z from "zod/v4";
const emailSchema = z.strictObject({
  email: z.email({ pattern: z.regexes.email }),
});

export { emailSchema };
