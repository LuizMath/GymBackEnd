import { prisma } from "../lib/prisma";

export async function getHolidaysService(year: number) {
  const response = await fetch(
    `https://brasilapi.com.br/api/feriados/v1/${year}`
  );
  return response.json();
}

export async function getSchedulesByModalityService(name?: string) {
  return prisma.schedules.findMany({
    where: name
      ? {
          modality: { name },
        }
      : {},
    include: {
      modality: true,
    },
  });
}

export async function getSchedulesByIdService(id: number) {
  return prisma.schedules.findUnique({
    where: { id },
    include: {
      modality: true,
    },
  });
}
