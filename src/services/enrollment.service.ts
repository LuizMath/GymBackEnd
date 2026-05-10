import { EnrollmentsCreateInput } from "../generated/prisma/models";
import { prisma } from "../lib/prisma";

export async function createEnrollmentService({
  full_name,
  cpf,
  zip_code,
  plan,
  user,
  preferred_time,
  street,
  number,
  terms_accepted,
}: EnrollmentsCreateInput) {
  return await prisma.enrollments.create({
    data: {
      full_name,
      cpf,
      zip_code,
      plan,
      user,
      preferred_time,
      street,
      number,
      terms_accepted,
    },
  });
}
