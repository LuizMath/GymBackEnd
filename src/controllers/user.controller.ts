import { FastifyRequest, FastifyReply } from "fastify";
import { createUserService, getUserByEmail } from "../services/user.service";
import { emailSchema } from "../schemas/userSchema";

export async function createUser(req: FastifyRequest, reply: FastifyReply) {
  const result = emailSchema.safeParse(req.body);
  if (!result.success) {
    throw req.server.httpErrors.badRequest("Dados inválidos!");
  }
  const { email } = result.data;
  const user = await getUserByEmail(email);
  if (user) {
    return reply.conflict("Usuário já existe!");
  }
  const createUser = await createUserService(email);
  return reply.status(201).send({ message: "Usuário criado com sucesso!" });
}

export async function getUser(req: FastifyRequest, reply: FastifyReply) {
  const result = emailSchema.safeParse(req.body);
  if (!result.success) {
    throw req.server.httpErrors.badRequest("Dados inválidos!");
  }
  const { email } = result.data;
  const user = await getUserByEmail(email);
  if (user) {
    return reply.status(200).send({ user });
  }
  return reply.notFound("Usuário inexistente!");
}
