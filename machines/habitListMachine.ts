import { assign, setup, type ActorRefFrom } from 'xstate';
import { habitMachine } from './habitMachine';

type HabitListContext = {
  habits: ActorRefFrom<typeof habitMachine>[];
};

type HabitListEvent =
  | { type: 'ADD_HABIT'; name: string }
  | { type: 'REMOVE_HABIT'; index: number };

const initialContext: HabitListContext = {
  habits: [],
};

export const habitListMachine = setup({
  types: {
    context: {} as HabitListContext,
    events: {} as HabitListEvent,
  },
  actors: {
    habit: habitMachine,
  },
}).createMachine({
  id: 'habitList',
  context: initialContext,
  on: {
    ADD_HABIT: {
      actions: assign({
        habits: ({ context, spawn, event }) => {
          const newHabit = spawn('habit', {
            input: {
              name: event.name,
              createdAt: Date.now(),
              completedDates: [],
            },
          });
          return [...context.habits, newHabit];
        },
      }),
    },
    REMOVE_HABIT: {
      actions: assign({
        habits: ({ context, event }) =>
          context.habits.filter((_, i) => i !== event.index),
      }),
    },
  },
});
