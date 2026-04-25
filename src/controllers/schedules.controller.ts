import { FastifyReply, FastifyRequest } from "fastify";
import {
  getHolidaysService,
  getSchedulesByModalityService,
} from "../services/schedules.service";
import { nameSchema, yearSchema } from "../schemas/schedulesSchema";
import { getAvailablesDays } from "../utils/generateAgenda";

export async function getHolidays(req: FastifyRequest, reply: FastifyReply) {
  const result = yearSchema.safeParse(req.body);
  if (!result.success) {
    throw req.server.httpErrors.badRequest("Dados inválidos!");
  }
  const { year } = result.data;
  const holidays = await getHolidaysService(year);
  getAvailablesDays();
  if (holidays) {
    return reply.status(200).send({ holidays });
  }
  return reply.notFound("Sem feriados disponíveis!");
}

export async function getSchedulesByModality(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const result = nameSchema.safeParse(req.query);
  if (!result.success) {
    throw req.server.httpErrors.badRequest("Dados inválidos!");
  }
  const { name } = result.data;
  const schedules = await getSchedulesByModalityService(name);
  if (schedules.length !== 0) {
    return reply.status(200).send({ schedules });
  }
  return reply.notFound("Sem agenda definida!");
}

