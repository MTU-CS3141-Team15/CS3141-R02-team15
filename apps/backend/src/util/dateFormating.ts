import { Habit } from "@prisma/client";

/**
 * Cast the stringified DateTime attributes of
 * a given list of habits to timestamps
 * @param habits List of habits to be formated
 * @returns List of correctly formated habits
 */
export function formatHabits(habits: Habit[]) {
  return habits.map((habit) => ({
    ...habit,
    dateCreated: habit.dateCreated.getTime(),
    endDate: habit.endDate.getTime(),
  }));
}

/**
 * Cast the stringified DataTime attributes of a given
 * habit to timestamps
 * @param habit - Habit to be formated
 * @returns Correctly formated habit
 */
export function formatHabit(habit: Habit) {
  return {
    ...habit,
    dateCreated: habit.dateCreated.getTime(),
    endDate: habit.endDate.getTime(),
  };
}
