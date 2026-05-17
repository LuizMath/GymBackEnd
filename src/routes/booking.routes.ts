import { FastifyInstance } from "fastify";
import {
  createBooking,
  createExperimentalBooking,
  confirmBooking,
  cancelBooking,
  getBookingsByUser,
} from "../controllers/booking.controller";

export default async function (app: FastifyInstance) {
  app.post("/booking", createBooking);
  app.post("/booking/experimental", createExperimentalBooking);
  app.post("/booking/list", getBookingsByUser);
  app.patch("/booking/:id/confirm", confirmBooking);
  app.patch("/booking/:id/cancel", cancelBooking);
}
