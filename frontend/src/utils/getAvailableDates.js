import { format, addDays } from "date-fns";

const getAvailableDates = (availableDays, range = 14) => {
  const today = new Date();
  const availableDates = [];

  for (let i = 0; i < range; i++) {
    const date = addDays(today, i);
    const dayName = format(date, "EEEE"); // e.g., "Monday"

    if (availableDays.includes(dayName)) {
      availableDates.push({
        label: `${format(date, "do MMMM")} (${dayName})`,
        value: format(date, "yyyy-MM-dd"),
      });
    }
  }

  return availableDates;
};

export default getAvailableDates;
