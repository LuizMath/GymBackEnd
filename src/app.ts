import fastify from "fastify";
import prismaPlugin from "./utils/prisma";
import plansRoutes from "./routes/plans.routes";
import fastifySensible from "@fastify/sensible";

export const app = fastify();

app.register(prismaPlugin);
app.register(fastifySensible);
app.register(plansRoutes);
