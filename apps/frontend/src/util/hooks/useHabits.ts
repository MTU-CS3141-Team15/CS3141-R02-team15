import { useCallback, useReducer } from "react";

enum HabitActionType {
  ADD = "ADD",
  DELETE = "DELETE",
}

interface HabitAction {
  type: HabitActionType;
  habits: Habit[];
}

export interface Habit {
  id: number;
  name: string;
  description: string;
  endDate: Date;
}

function habitsReducer(state: Habit[], action: HabitAction) {
  const { type, habits } = action;

  switch (type) {
    case HabitActionType.ADD:
      return state.concat(habits);
    case HabitActionType.DELETE:
      return state.filter(
        (habit) => habits.find((val) => val.id === habit.id) === undefined
      );
  }
}

export default function useHabits(
  init: Habit[]
): [Habit[], (...habits: Habit[]) => void, (...habits: Habit[]) => void] {
  const [habits, habitsDispatch] = useReducer(habitsReducer, init);

  const addHabits = useCallback(
    (...habits: Habit[]) =>
      habitsDispatch({ type: HabitActionType.ADD, habits: habits }),
    []
  );

  const deleteHabits = useCallback(
    (...habits: Habit[]) =>
      habitsDispatch({ type: HabitActionType.DELETE, habits: habits }),
    []
  );

  return [habits, addHabits, deleteHabits];
}
