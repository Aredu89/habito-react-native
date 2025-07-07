import { HabitListContext } from '@/context/HabitListContext';
import { useContext } from 'react';

export const useHabitListMachine = () => {
  const actor = useContext(HabitListContext);
  if (!actor) throw new Error('useHabitListMachine must be used within HabitListContext');
  return actor;
};
