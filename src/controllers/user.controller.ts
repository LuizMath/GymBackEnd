import { FastifyRequest, FastifyReply } from "fastify";
import z, { regexes } from "zod/v4";
import { createUserService, getUserByEmail } from "../services/user.service";

export async function createUser(req: FastifyRequest, reply: FastifyReply) {
  const emailSchema = z.strictObject({
    email: z.email({ pattern: z.regexes.email }),
  });
  const result = emailSchema.safeParse(req.body);
  if (!result.success) {
    throw req.server.httpErrors.badRequest("");
  }
  const { email } = result.data;
  const existsUser = await getUserByEmail(email);
  if (existsUser) {
    return reply.conflict("Usuário já existe!");
  }
  const createUser = await createUserService(email);
  return reply.status(201).send({ message: "Usuário criado com sucesso!" });
}
