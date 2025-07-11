import { assign, sendParent, setup } from 'xstate';

type HabitContext = {
  name: string;
  createdAt: number;
  completedDates: number[];
};

type HabitEvent =
  | { type: 'MARK_COMPLETE'; date: number }
  | { type: 'UNMARK_COMPLETE'; date: number };

export const habitMachine = setup({
  types: {
    context: {} as HabitContext,
    events: {} as HabitEvent,
    input: {} as HabitContext,
  },
}).createMachine(
  {
    id: 'habit',
    initial: 'tracking',
    context: ({ input }) => input,

    states: {
      tracking: {
        on: {
          MARK_COMPLETE: {
            actions: [
              assign(({context, event}) => {
                if (event?.type === 'MARK_COMPLETE') {
                  if (!context.completedDates.includes(event.date)) {
                    return {
                      completedDates: [...context.completedDates, event.date],
                    };
                  }
                }
                return {};
              }),
              sendParent(() => ({
                type: 'PERSIST_HABITS',
              })),
            ]
          },
          UNMARK_COMPLETE: {
            actions: [
              assign(({context, event}) => {
                if (event?.type === 'UNMARK_COMPLETE') {
                  return {
                    completedDates: context.completedDates.filter(
                      (d) => d !== event.date
                    ),
                  };
                }
                return {};
              }),
              sendParent(() => ({
                type: 'PERSIST_HABITS',
              })),
            ]
          },
        },
      },
    },
  },
);
