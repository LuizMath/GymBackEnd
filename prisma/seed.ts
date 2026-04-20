import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.plans.createMany({
    data: [
      {
        name: "Vital Fit",
        price: 89.9,
        duration_months: 1,
        description:
          "Foco em atividades essenciais. Acesso à musculação e cardio com app incluso.",
        has_phys_eval: false,
        has_nutritionist: false,
        has_app_access: true,
      },
      {
        name: "Vital Total",
        price: 149.9,
        duration_months: 12,
        description:
          "Plano completo com todas as atividades, avaliação física mensal e acompanhamento nutricional.",
        has_phys_eval: true,
        has_nutritionist: true,
        has_app_access: true,
      },
      {
        name: "Vital Zen",
        price: 119.9,
        duration_months: 3,
        description:
          "Foco em equilíbrio e relaxamento com yoga, pilates, meditação e acesso ao spa.",
        has_phys_eval: true,
        has_nutritionist: false,
        has_app_access: true,
      },
    ],
  });
  await prisma.modalities.createMany({
    data: [
      {
        name: "Musculação",
        description: "Treinamento com pesos para ganho de massa muscular",
        objective: "HIPERTROFIA",
      },
      {
        name: "Cardio",
        description: "Exercícios aeróbicos como esteira e bicicleta",
        objective: "EMAGRECIMENTO",
      },
      {
        name: "Funcional",
        description: "Treinos dinâmicos com peso corporal",
        objective: "EMAGRECIMENTO",
      },
      {
        name: "HIIT",
        description: "Treino intervalado de alta intensidade",
        objective: "EMAGRECIMENTO",
      },
      {
        name: "Spinning",
        description: "Aulas intensas de ciclismo indoor",
        objective: "EMAGRECIMENTO",
      },
      {
        name: "Cross Training",
        description: "Treino misto de força e resistência",
        objective: "HIPERTROFIA",
      },
      {
        name: "Yoga",
        description: "Prática de equilíbrio físico e mental",
        objective: "RELAXAMENTO",
      },
      {
        name: "Pilates",
        description: "Fortalecimento com foco em postura e respiração",
        objective: "RELAXAMENTO",
      },
      {
        name: "Meditação",
        description: "Técnicas de relaxamento e foco mental",
        objective: "RELAXAMENTO",
      },
    ],
  });
  const plans = await prisma.plans.findMany();
  const mods = await prisma.modalities.findMany();

  const planFit = plans.find((p) => p.name === "Vital Fit")!;
  const planTotal = plans.find((p) => p.name === "Vital Total")!;
  const planZen = plans.find((p) => p.name === "Vital Zen")!;
  const mod = (name: string) => mods.find((m) => m.name === name)!;
  await prisma.plansOnModalities.createMany({
    data: [
      { planId: planFit.id, modalityId: mod("Musculação").id },
      { planId: planFit.id, modalityId: mod("Cardio").id },
      ...mods.map((m) => ({
        planId: planTotal.id,
        modalityId: m.id,
      })),
      { planId: planZen.id, modalityId: mod("Yoga").id },
      { planId: planZen.id, modalityId: mod("Pilates").id },
      { planId: planZen.id, modalityId: mod("Meditação").id },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
