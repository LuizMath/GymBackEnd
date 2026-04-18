import { prisma } from "../lib/prisma";

export async function getPlansService() {
  return prisma.plans.findMany();
}
