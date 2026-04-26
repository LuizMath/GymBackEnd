import { FastifyInstance } from "fastify";
import { createBooking } from "../controllers/booking.controller";

export default async function (app: FastifyInstance) {
  app.post("/booking", createBooking);
}
