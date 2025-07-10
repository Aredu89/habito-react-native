import { HabitListContext } from '@/context/HabitListContext';
import { useContext, useEffect } from 'react';

export const useHabitListMachine = () => {
  const actor = useContext(HabitListContext);
  if (!actor) throw new Error('useHabitListMachine must be used within HabitListContext');

  // Load persisted habits once on mount
  useEffect(() => {
    actor.send({ type: 'LOAD' });
  }, [actor]);

  return actor;
};
