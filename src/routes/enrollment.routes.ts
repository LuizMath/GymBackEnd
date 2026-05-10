import { FastifyInstance } from "fastify";
import { createEnrollment } from "../controllers/enrollment.controller";

export default async function (app: FastifyInstance) {
  app.post("/enrollment", createEnrollment);
}
