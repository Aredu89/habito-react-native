import { createMachine } from 'xstate';

export const appMachine = createMachine({
  id: 'app',
  initial: 'loading',
  states: {
    loading: {
      on: {
        READY: 'unauthenticated',
      },
    },
    unauthenticated: {
      on: {
        LOGIN: 'authenticated',
      },
    },
    authenticated: {
      on: {
        LOGOUT: 'unauthenticated',
      },
    },
  },
});
