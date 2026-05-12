import { EnrollmentsCreateInput } from "../generated/prisma/models";
import { prisma } from "../lib/prisma";

export async function createEnrollmentService(data: EnrollmentsCreateInput) {
  return await prisma.enrollments.create({ data });
}
