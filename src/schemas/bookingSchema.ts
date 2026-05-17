import z from "zod/v4";

const createBookingSchema = z.strictObject({
  enrollment: z.number(),
  schedule: z.number(),
  booking_date: z.iso.date(),
});

const createExperimentalBookingSchema = z.strictObject({
  name: z.string().max(50),
  contact: z.string().max(50),
  modality: z.number(),
});

const bookingIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const getBookingsByUserSchema = z.strictObject({
  userId: z.number().int().positive(),
});

export {
  createBookingSchema,
  createExperimentalBookingSchema,
  bookingIdParamSchema,
  getBookingsByUserSchema,
};
