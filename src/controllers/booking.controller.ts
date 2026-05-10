import { FastifyReply, FastifyRequest } from "fastify";
import {
  createBookingSchema,
  createExperimentalBookingSchema,
} from "../schemas/bookingSchema";
import {
  createBookingService,
  createExperimentalBookingService,
} from "../services/booking.service";
import moment from "moment";
import { getAvailablesDays } from "../utils/generateAgenda";
import { getSchedulesByIdService } from "../services/schedules.service";

export async function createBooking(req: FastifyRequest, reply: FastifyReply) {
  const result = createBookingSchema.safeParse(req.body);
  if (!result.success) {
    throw req.server.httpErrors.badRequest("Dados inválidos");
  }
  const { schedule, enrollment, booking_date } = result.data;
  const availableDays = getAvailablesDays();
  const targetSchedule = await getSchedulesByIdService(schedule);
  const today = moment().startOf("day");
  if (
    !availableDays.includes(moment(booking_date).locale("pt-br").format("L"))
  ) {
    throw req.server.httpErrors.badRequest(
      "Não é possível reservar nesse dia!"
    );
  }
  if (moment(booking_date).isBefore(today)) {
    throw req.server.httpErrors.badRequest(
      "Não é possível realizar agendamentos para datas passadas!"
    );
  }
  if (
    moment(
      `${booking_date} ${targetSchedule?.start_time}`,
      "YYYY-MM-DD HH:mm"
    ).isBefore(moment())
  ) {
    throw req.server.httpErrors.badRequest(
      "Não é possível agendar um horário que já passou!"
    );
  }
  const createBooking = await createBookingService({
    booking_date: moment(booking_date).utc(true).toDate(),
    enrollment: { connect: { id: enrollment } },
    schedule: { connect: { id: schedule } },
  });
  return reply.status(201).send({ message: "Agendamento feito com sucesso!" });
}

export async function createExperimentalBooking(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const result = createExperimentalBookingSchema.safeParse(req.body);
  if (!result.success) {
    throw req.server.httpErrors.badRequest("Dados inválidos!");
  }
  const { name, contact, modality } = result.data;
  const createExperimentalBooking = await createExperimentalBookingService({
    name,
    contact,
    modality: { connect: { id: modality } },
  });
  return reply
    .status(201)
    .send({ message: "Aula experimental agendada com sucesso!" });
}
