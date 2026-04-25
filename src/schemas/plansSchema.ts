import z from "zod/v4";

const objectiveSchema = z.strictObject({
  objective: z.enum(["RELAXAMENTO", "HIPERTROFIA", "EMAGRECIMENTO"]).optional(),
});

export { objectiveSchema };
