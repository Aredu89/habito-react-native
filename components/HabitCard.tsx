import { habitMachine } from '@/machines/habitMachine';
import { getTodayDate } from '@/utils/date';
import { useSelector } from '@xstate/react';
import { Button, Text, View } from 'react-native';
import type { ActorRefFrom } from 'xstate';

type Props = {
  habit: ActorRefFrom<typeof habitMachine>;
  index: number;
};

export function HabitCard({ habit, index }: Props) {
  const today = getTodayDate();

  const name = useSelector(habit, (s) => s.context.name);
  const completedDates = useSelector(habit, (s) => s.context.completedDates);
  console.log("completedDates:: ", completedDates)
  console.log("Today:: ", today)
  const isCompletedToday = completedDates.includes(today);

  return (
    <View className="mb-4 p-3 border rounded-xl bg-gray-100 dark:bg-gray-800">
      <Text className="text-lg font-semibold text-black dark:text-white">
        {name || `Habit ${index + 1}`}
      </Text>
      <Text className="text-sm text-gray-600 dark:text-gray-300">
        Completed Days: {completedDates.length}
      </Text>

      <Button
        title={isCompletedToday ? 'Unmark Today' : 'Mark as Done Today'}
        onPress={() =>
          habit.send({
            type: isCompletedToday ? 'UNMARK_COMPLETE' : 'MARK_COMPLETE',
            date: today,
          })
        }
      />
    </View>
  );
}
