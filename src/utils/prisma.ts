import fp from "fastify-plugin";
import { prisma } from "../lib/prisma";

export default fp(async (app) => {
  app.decorate("prisma", prisma);
});
