import moment from "moment";

export function getAvailablesDays() {
  const availablesDays: string[] = [];
  const startAgendaDays = moment().startOf("week");
  for (let i = 0; i < 14; i++) {
    if ([0, 6].includes(startAgendaDays.clone().add(i, "days").day())) {
      continue;
    }
    availablesDays.push(
      startAgendaDays.clone().add(i, "days").format("DD/MM/YYYY")
    );
  }
  return availablesDays;
}
