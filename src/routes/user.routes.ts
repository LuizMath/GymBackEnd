import { FastifyInstance } from "fastify";
import { createUser } from "../controllers/user.controller";

export default async function (app: FastifyInstance) {
  app.post("/createUser", createUser);
}
