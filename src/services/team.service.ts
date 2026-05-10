import { prisma } from "../lib/prisma";

export async function getTeamService() {
  return prisma.team.findMany();
}
