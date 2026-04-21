import { prisma } from "../lib/prisma";

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function createUserService(email: string) {
  return await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email },
  });
}
