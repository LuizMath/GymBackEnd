import moment from "moment";
import { BookingCreateInput } from "../generated/prisma/models";
import { prisma } from "../lib/prisma";

export async function createBookingService({
  booking_date,
  enrollment,
  schedule,
}: BookingCreateInput) {
  return await prisma.booking.create({
    data: { booking_date, enrollment, schedule },
  });
}
