import fastify from "fastify";
import prismaPlugin from "./utils/prisma";
import plansRoutes from "./routes/plans.routes";

export const app = fastify();

app.register(prismaPlugin);
app.register(plansRoutes);
