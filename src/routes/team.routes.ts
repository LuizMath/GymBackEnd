import { FastifyInstance } from "fastify";
import { getTeam } from "../controllers/team.controller";

export default async function (app: FastifyInstance) {
  app.get("/team", getTeam);
}
