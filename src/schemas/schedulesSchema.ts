import z from "zod/v4";

const yearSchema = z.strictObject({
  year: z.number(),
});

const nameSchema = z.strictObject({
  name: z.string().nonempty().optional(),
});

export { yearSchema, nameSchema };
