import { FastifyRequest, FastifyReply } from "fastify";
import { createEnrollmentSchema } from "../schemas/enrollmentSchema";
import { createEnrollmentService } from "../services/enrollment.service";
import moment from "moment";

export async function createEnrollment(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const result = createEnrollmentSchema.safeParse(req.body);
  if (!result.success) {
    throw req.server.httpErrors.badRequest("Dados inválidos!");
  }
  const {
    full_name,
    cpf,
    zip_code,
    plan,
    user,
    preferred_time,
    street,
    number,
    terms_accepted,
  } = result.data;
  const createEnrollment = await createEnrollmentService({
    full_name,
    cpf,
    zip_code,
    plan: { connect: { id: plan } },
    user: { connect: { id: user } },
    preferred_time: moment(preferred_time, "HH:mm").utc(true).toDate(),
    street,
    number,
    terms_accepted,
  });
  return reply.status(201).send({ message: "Matrícula feita com sucesso!" });
}
