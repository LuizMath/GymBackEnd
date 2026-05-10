import { FastifyRequest, FastifyReply } from "fastify";
import { getTeamService } from "../services/team.service";

export async function getTeam(req: FastifyRequest, reply: FastifyReply) {
  const team = await getTeamService();
  return reply.status(200).send(team);
}
