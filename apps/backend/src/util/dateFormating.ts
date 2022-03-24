import { Habit } from "@prisma/client";

/**
 * Function that will cast the stringified DateTime attributes
 * of a given list of habits to timestamps
 * @param habits
 */
export function formatHabits(habits: Habit[]) {
  return habits.map((habit) => ({
    ...habit,
    dateCreated: habit.dateCreated.getTime(),
    endDate: habit.endDate.getTime(),
  }));
}
