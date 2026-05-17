import { EnrollmentsCreateInput } from "../generated/prisma/models";
import { prisma } from "../lib/prisma";

export async function createEnrollmentService(data: EnrollmentsCreateInput) {
  return await prisma.enrollments.create({ data });
}

export async function getEnrollmentByUserService(userId: number) {
  return await prisma.enrollments.findFirst({
    where: { userId },
    include: { plan: true },
    orderBy: { created_at: "desc" },
  });
}
