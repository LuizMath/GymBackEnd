import { FastifyInstance } from "fastify";
import { createUser, getUser } from "../controllers/user.controller";

export default async function (app: FastifyInstance) {
  app.post("/createUser", createUser);
  app.post("/getUser", getUser);
}
