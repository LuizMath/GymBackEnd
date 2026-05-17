import { FastifyRequest, FastifyReply } from "fastify";
import {
  createEnrollmentSchema,
  getEnrollmentByUserSchema,
} from "../schemas/enrollmentSchema";
import {
  createEnrollmentService,
  getEnrollmentByUserService,
} from "../services/enrollment.service";
import moment from "moment";

export async function createEnrollment(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const result = createEnrollmentSchema.safeParse(req.body);
  if (!result.success) {
    req.log.warn({ issues: result.error.issues }, "enrollment validação falhou");
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
    email,
    phone,
    birthdate,
    complement,
    neighborhood,
    city,
    state,
  } = result.data;

  const cpfDigits = cpf.replace(/\D/g, "");
  const zipDigits = zip_code.replace(/\D/g, "");

  await createEnrollmentService({
    full_name,
    cpf: `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3, 6)}.${cpfDigits.slice(6, 9)}-${cpfDigits.slice(9, 11)}`,
    zip_code: `${zipDigits.slice(0, 5)}-${zipDigits.slice(5, 8)}`,
    plan: { connect: { id: plan } },
    user: { connect: { id: user } },
    preferred_time: moment(preferred_time, "HH:mm").utc(true).toDate(),
    street,
    number,
    terms_accepted,
    email: email ?? null,
    phone: phone ?? null,
    birthdate: birthdate ? moment(birthdate, "YYYY-MM-DD").utc(true).toDate() : null,
    complement: complement && complement.length > 0 ? complement : null,
    neighborhood: neighborhood ?? null,
    city: city ?? null,
    state: state ?? null,
  });
  return reply.status(201).send({ message: "Matrícula feita com sucesso!" });
}

export async function getEnrollmentByUser(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const result = getEnrollmentByUserSchema.safeParse(req.params);
  if (!result.success) {
    throw req.server.httpErrors.badRequest("userId inválido");
  }
  const enrollment = await getEnrollmentByUserService(result.data.userId);
  if (!enrollment) {
    throw req.server.httpErrors.notFound("Matrícula não encontrada");
  }
  return reply.send({ data: enrollment });
}
