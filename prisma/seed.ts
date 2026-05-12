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
      {
        name: "Personal Trainer",
        description: "Acompanhamento individual com profissional dedicado",
        objective: "HIPERTROFIA",
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
      { planId: planFit.id, modalityId: mod("Funcional").id },
      ...mods.map((m) => ({
        planId: planTotal.id,
        modalityId: m.id,
      })),
      { planId: planZen.id, modalityId: mod("Yoga").id },
      { planId: planZen.id, modalityId: mod("Pilates").id },
      { planId: planZen.id, modalityId: mod("Meditação").id },
    ],
  });
  await prisma.schedules.createMany({
    data: [
      {
        day_of_week: "SEGUNDA",
        start_time: "07:30",
        end_time: "08:30",
        modalityId: mod("Cross Training").id,
        max_capacity: 20,
        needs_booking: true,
      },
      {
        day_of_week: "SEGUNDA",
        start_time: "14:00",
        end_time: "15:30",
        modalityId: mod("Musculação").id,
        max_capacity: 30,
        needs_booking: false,
      },
      {
        day_of_week: "SEGUNDA",
        start_time: "18:00",
        end_time: "19:00",
        modalityId: mod("Spinning").id,
        max_capacity: 15,
        needs_booking: true,
      },
      {
        day_of_week: "TERCA",
        start_time: "08:00",
        end_time: "09:00",
        modalityId: mod("Yoga").id,
        max_capacity: 12,
        needs_booking: false,
      },
      {
        day_of_week: "TERCA",
        start_time: "15:00",
        end_time: "16:00",
        modalityId: mod("Funcional").id,
        max_capacity: 20,
        needs_booking: true,
      },
      {
        day_of_week: "TERCA",
        start_time: "18:30",
        end_time: "19:30",
        modalityId: mod("Cross Training").id,
        max_capacity: 20,
        needs_booking: true,
      },
      {
        day_of_week: "QUARTA",
        start_time: "07:30",
        end_time: "08:30",
        modalityId: mod("Cross Training").id,
        max_capacity: 20,
        needs_booking: true,
      },
      {
        day_of_week: "QUARTA",
        start_time: "13:30",
        end_time: "14:30",
        modalityId: mod("Cardio").id,
        max_capacity: 15,
        needs_booking: false,
      },
      {
        day_of_week: "QUARTA",
        start_time: "16:30",
        end_time: "17:30",
        modalityId: mod("HIIT").id,
        max_capacity: 15,
        needs_booking: true,
      },
      {
        day_of_week: "QUINTA",
        start_time: "09:00",
        end_time: "10:00",
        modalityId: mod("Pilates").id,
        max_capacity: 10,
        needs_booking: true,
      },
      {
        day_of_week: "QUINTA",
        start_time: "14:30",
        end_time: "16:00",
        modalityId: mod("Musculação").id,
        max_capacity: 30,
        needs_booking: false,
      },
      {
        day_of_week: "QUINTA",
        start_time: "17:00",
        end_time: "18:00",
        modalityId: mod("HIIT").id,
        max_capacity: 15,
        needs_booking: true,
      },
      {
        day_of_week: "SEXTA",
        start_time: "07:30",
        end_time: "08:30",
        modalityId: mod("Cross Training").id,
        max_capacity: 20,
        needs_booking: true,
      },
      {
        day_of_week: "SEXTA",
        start_time: "15:30",
        end_time: "16:30",
        modalityId: mod("Spinning").id,
        max_capacity: 15,
        needs_booking: true,
      },
      {
        day_of_week: "SEXTA",
        start_time: "19:00",
        end_time: "20:00",
        modalityId: mod("HIIT").id,
        max_capacity: 15,
        needs_booking: true,
      },
      // ── Sábado ──────────────────────────────────────────────────────────
      {
        day_of_week: "SABADO",
        start_time: "08:00",
        end_time: "09:00",
        modalityId: mod("Yoga").id,
        max_capacity: 12,
        needs_booking: true,
      },
      {
        day_of_week: "SABADO",
        start_time: "09:00",
        end_time: "10:30",
        modalityId: mod("Cross Training").id,
        max_capacity: 20,
        needs_booking: true,
      },
      {
        day_of_week: "SABADO",
        start_time: "10:00",
        end_time: "12:00",
        modalityId: mod("Musculação").id,
        max_capacity: 30,
        needs_booking: false,
      },
      {
        day_of_week: "SABADO",
        start_time: "11:00",
        end_time: "12:00",
        modalityId: mod("Pilates").id,
        max_capacity: 10,
        needs_booking: true,
      },
      {
        day_of_week: "SABADO",
        start_time: "12:00",
        end_time: "13:00",
        modalityId: mod("Personal Trainer").id,
        max_capacity: 4,
        needs_booking: true,
      },
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
