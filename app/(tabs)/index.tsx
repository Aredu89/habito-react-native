import { useHabitListMachine } from '@/hooks/useHabitListMachine';
import { useSelector } from '@xstate/react';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function HabitListScreen() {
  const habitList = useHabitListMachine();
  const habits = useSelector(habitList, (s) => s.context.habits);

  const [name, setName] = useState('');

  return (
    <View className="flex-1 p-4 bg-white dark:bg-black">
      <Text className="text-2xl font-bold text-center mb-4 text-blue-600">Your Habits</Text>

      {habits.map((habit, index) => {
        const state = habit.getSnapshot();
        return (
          <View key={index} className="mb-4 p-3 border rounded-xl bg-gray-100 dark:bg-gray-800">
            <Text className="text-lg font-semibold text-black dark:text-white">
              {state.context.name || `Habit ${index + 1}`}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-300">
              Completed Days: {state.context.completedDates.length}
            </Text>
          </View>
        );
      })}

      <View className="flex-row mt-6 items-center justify-between gap-2">
        <TextInput
          placeholder="New habit name"
          className="flex-1 px-3 py-2 border rounded-md text-black dark:text-white bg-white dark:bg-gray-900"
          value={name}
          onChangeText={setName}
        />
        <Button title="Add" onPress={() => {
          if (name.trim()) {
            habitList.send({ type: 'ADD_HABIT', name: name.trim() });
            setName('');
          }
        }} />
      </View>
    </View>
  );
}
