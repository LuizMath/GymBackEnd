import { prisma } from "../lib/prisma";

export async function createUserService(email: string) {
  return await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email },
  });
}
