import fastify from "fastify";
import prismaPlugin from "./utils/prisma";
import plansRoutes from "./routes/plans.routes";
import fastifySensible from "@fastify/sensible";
import userRoutes from "./routes/user.routes";
import schedulesRoutes from "./routes/schedules.routes";
import bookingRoutes from "./routes/booking.routes";
import enrollmentRoutes from "./routes/enrollment.routes";
import cors from "@fastify/cors";

export const app = fastify();

app.register(cors, {
  origin: "*",
});
app.register(prismaPlugin);
app.register(fastifySensible);
app.register(plansRoutes);
app.register(userRoutes);
app.register(schedulesRoutes);
app.register(bookingRoutes);
app.register(enrollmentRoutes);

app.setErrorHandler((error: any, req, reply) => {
  const statusCode = error.statusCode ?? 500;
  req.log.error(error);
  switch (error.code) {
    case "P2002":
      return reply.conflict("Chave duplicada!");
    case "P2025":
      return reply.notFound("Registro não encontrado!");
    case "P2003":
      return reply.badRequest("Relacionamento inválido!");
    default:
      return reply.status(statusCode).send({
        statusCode,
        error: error.name ?? "Erro",
        message: error.message ?? "Erro interno no servidor!",
      });
  }
});
