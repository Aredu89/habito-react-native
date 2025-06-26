import { assign, setup } from 'xstate';

type HabitContext = {
  name: string;
  createdAt: number;
  completedDates: number[];
};

type HabitEvent =
  | { type: 'MARK_COMPLETE'; date: number }
  | { type: 'UNMARK_COMPLETE'; date: number };

const initialContext: HabitContext = {
  name: '',
  createdAt: Date.now(),
  completedDates: [],
};

export const habitMachine = setup({
  types: {
    context: {} as HabitContext,
    events: {} as HabitEvent,
  },
}).createMachine(
  {
    id: 'habit',
    initial: 'tracking',
    context: initialContext,

    states: {
      tracking: {
        on: {
          MARK_COMPLETE: {
            actions: assign(({context, event}) => {
              if (event?.type === 'MARK_COMPLETE') {
                if (!context.completedDates.includes(event.date)) {
                  return {
                    completedDates: [...context.completedDates, event.date],
                  };
                }
              }
              return {};
            }),
          },
          UNMARK_COMPLETE: {
            actions: assign(({context, event}) => {
              if (event?.type === 'UNMARK_COMPLETE') {
                return {
                  completedDates: context.completedDates.filter(
                    (d) => d !== event.date
                  ),
                };
              }
              return {};
            }),
          },
        },
      },
    },
  },
);
