import { FastifyInstance } from "fastify";
import {
  createEnrollment,
  getEnrollmentByUser,
} from "../controllers/enrollment.controller";

export default async function (app: FastifyInstance) {
  app.post("/enrollment", createEnrollment);
  app.get("/enrollment/user/:userId", getEnrollmentByUser);
}
