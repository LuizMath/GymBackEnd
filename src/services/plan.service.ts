import { Objective } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";

export async function getPlansService(objective?: Objective) {
  return prisma.plans.findMany({
    where: objective
      ? { modalities: { some: { modality: { objective } } } }
      : {},
    include: {
      modalities: {
        include: { modality: true },
      },
    },
  });
}
