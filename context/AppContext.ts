import { appMachine } from '@/machines/appMachine';
import { createActorContext } from '@xstate/react';

export const AppMachineContext = createActorContext(appMachine);