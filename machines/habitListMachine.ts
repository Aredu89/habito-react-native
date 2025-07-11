import { loadHabits, saveHabits } from '@/utils/storage';
import { assign, setup, type ActorRefFrom } from 'xstate';
import { habitMachine } from './habitMachine';

type HabitListContext = {
  habits: ActorRefFrom<typeof habitMachine>[];
};

type HabitListEvent =
  | { type: 'ADD_HABIT'; name: string }
  | { type: 'REMOVE_HABIT'; index: number }
  | { type: 'LOAD' }
  | { type: 'HYDRATE'; data: HabitSnapshot[] };

type HabitSnapshot = {
  name: string;
  createdAt: number;
  completedDates: number[];
};

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
  actions: {
    hydrate: assign({
      habits: ({ event, spawn, context }) => {
        if (event.type !== 'HYDRATE') return context.habits;

        return event.data.map((snapshot) =>
          spawn('habit', { input: snapshot })
        );
      },
    }),
    persist: ({ context }) => {
      const data = context.habits.map(
        (actor) => actor.getSnapshot().context
      );
      saveHabits(data);
    },
  },
}).createMachine({
  id: 'habitList',
  context: initialContext,
  on: {
    LOAD: {
      actions: async ({ self }) => {
        const saved = await loadHabits<HabitSnapshot[]>();
        if (saved) {
          self.send({ type: 'HYDRATE', data: saved });
        }
      },
    },
    HYDRATE: {
      actions: 'hydrate',
    },
    ADD_HABIT: {
      actions: [
        assign({
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
        'persist',
      ]
    },
    REMOVE_HABIT: {
      actions: [
        assign({
          habits: ({ context, event }) =>
            context.habits.filter((_, i) => i !== event.index),
        }),
        'persist'
      ]
    },
    PERSIST_HABITS: {
      actions: 'persist'
    },
  },
});
