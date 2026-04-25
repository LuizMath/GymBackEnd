import { FastifyReply, FastifyRequest } from "fastify";
import { getPlansService } from "../services/plan.service";
import { objectiveSchema } from "../schemas/plansSchema";

export async function getPlans(req: FastifyRequest, reply: FastifyReply) {
  const result = objectiveSchema.safeParse(req.query);
  if (!result.success) {
    throw req.server.httpErrors.badRequest("Dados inválidos!");
  }
  const { objective } = result.data;
  const plans = await getPlansService(objective);
  if (plans.length !== 0) {
    return reply.status(200).send({ data: plans });
  }
  return reply.notFound("Sem planos definidos");
}
