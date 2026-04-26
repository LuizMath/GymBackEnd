import { FastifyReply, FastifyRequest } from "fastify";
import { createBookingSchema } from "../schemas/bookingSchema";
import { createBookingService } from "../services/booking.service";
import moment from "moment";

export async function createBooking(req: FastifyRequest, reply: FastifyReply) {
  const result = createBookingSchema.safeParse(req.body);
  if (!result.success) {
    throw req.server.httpErrors.badRequest("Dados inválidos");
  }
  const { schedule, enrollment, booking_date } = result.data;
  const createBooking = await createBookingService({
    booking_date: moment(booking_date).toDate(),
    enrollment: { connect: { id: enrollment } },
    schedule: { connect: { id: schedule } },
  });
  return reply.status(201).send({ message: "Agendamento feito com sucesso!" });
}
