import { FastifyReply, FastifyRequest } from "fastify";
import { getPlansService } from "../services/plan.service";

export async function getPlans(req: FastifyRequest, reply: FastifyReply) {
  const plans = await getPlansService();
  if (plans.length !== 0) {
    return reply.status(200).send({ data: plans });
  }
  return reply.notFound("Sem planos definidos");
}
