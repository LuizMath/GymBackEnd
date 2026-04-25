import { FastifyInstance } from "fastify";
import {
  getHolidays,
  getSchedulesByModality,
} from "../controllers/schedules.controller";

export default async function (app: FastifyInstance) {
  app.post("/schedules/holidays", getHolidays);
  app.get("/schedules", getSchedulesByModality);
}
