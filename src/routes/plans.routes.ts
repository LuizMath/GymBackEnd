import { FastifyInstance } from "fastify";
import { getPlans } from "../controllers/plans.controller";

export default async function (app: FastifyInstance) {
  app.get("/plans", getPlans);
}
