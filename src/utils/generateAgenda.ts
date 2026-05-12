import moment from "moment";

/**
 * Retorna as datas disponíveis para agendamento (próximas 2 semanas).
 * Exclui apenas domingo (0). Sábado (6) é dia útil de academia.
 */
export function getAvailablesDays() {
  const availablesDays: string[] = [];
  const startAgendaDays = moment().startOf("week");
  for (let i = 0; i < 14; i++) {
    const dayOfWeek = startAgendaDays.clone().add(i, "days").day();
    if (dayOfWeek === 0) {
      continue;
    }
    availablesDays.push(
      startAgendaDays.clone().add(i, "days").format("DD/MM/YYYY")
    );
  }
  return availablesDays;
}
