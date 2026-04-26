import z from "zod/v4";

const createBookingSchema = z.strictObject({
  enrollment: z.number(),
  schedule: z.number(),
  booking_date: z.iso.date(),
});

export { createBookingSchema };
