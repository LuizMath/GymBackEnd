import moment from "moment";
import {
  BookingCreateInput,
  Experimental_LeadsCreateInput,
} from "../generated/prisma/models";
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

export async function createExperimentalBookingService({
  name,
  contact,
  modality,
}: Experimental_LeadsCreateInput) {
  return await prisma.experimental_Leads.create({
    data: {
      name,
      contact,
      modality,
    },
  });
}

export async function confirmBookingService(id: number) {
  return await prisma.booking.update({
    where: { id },
    data: { status: "CONFIRMADO" },
  });
}

export async function cancelBookingService(id: number) {
  return await prisma.booking.update({
    where: { id },
    data: { status: "CANCELADO" },
  });
}
