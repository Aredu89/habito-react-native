import { habitListMachine } from '@/machines/habitListMachine';
import { createContext } from 'react';
import { type ActorRefFrom } from 'xstate';

export const HabitListContext = createContext<ActorRefFrom<typeof habitListMachine> | null>(null);
