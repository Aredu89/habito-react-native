import { habitListMachine } from '@/machines/habitListMachine';
import { habitMachine } from '@/machines/habitMachine';
import { getTodayDate } from '@/utils/date';
import { useSelector } from '@xstate/react';
import { Alert, Button, Platform, Text, View } from 'react-native';
import type { ActorRefFrom } from 'xstate';

type Props = {
  habit: ActorRefFrom<typeof habitMachine>;
  index: number;
  habitList: ActorRefFrom<typeof habitListMachine>;
};

export function HabitCard({ habit, index, habitList }: Props) {
  const today = getTodayDate();
  const name = useSelector(habit, (s) => s.context.name);
  const completedDates = useSelector(habit, (s) => s.context.completedDates);
  const isCompletedToday = completedDates.includes(today);

  const confirmDelete = () => {
    const message = `Are you sure you want to delete "${name || `Habit ${index + 1}`}"?`;
  
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(message);
      if (confirmed) {
        habitList.send({ type: 'REMOVE_HABIT', index });
      }
    } else {
      Alert.alert('Delete Habit', message, [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => habitList.send({ type: 'REMOVE_HABIT', index }),
        },
      ]);
    }
  };

  return (
    <View className="mb-4 p-3 border rounded-xl bg-gray-100 dark:bg-gray-800">
      <Text className="text-lg font-semibold text-black dark:text-white">
        {name || `Habit ${index + 1}`}
      </Text>
      <Text className="text-sm text-gray-600 dark:text-gray-300">
        Completed Days: {completedDates.length}
      </Text>

      <View className="flex-row gap-2 mt-2">
        <Button
          title={isCompletedToday ? 'Unmark Today' : 'Mark as Done Today'}
          onPress={() =>
            habit.send({
              type: isCompletedToday ? 'UNMARK_COMPLETE' : 'MARK_COMPLETE',
              date: today,
            })
          }
        />
        <Button title="Delete" color="#ff4444" onPress={confirmDelete} />
      </View>
    </View>
  );
}
