import { FastifyInstance } from "fastify";
import { createBooking, createExperimentalBooking } from "../controllers/booking.controller";

export default async function (app: FastifyInstance) {
  app.post("/booking", createBooking);
  app.post("/booking/experimental", createExperimentalBooking);
}
