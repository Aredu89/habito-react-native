import { HabitCard } from '@/components/HabitCard';
import { useHabitListMachine } from '@/hooks/useHabitListMachine';
import { useSelector } from '@xstate/react';
import { useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';

export default function HabitListScreen() {
  const habitList = useHabitListMachine();
  const habits = useSelector(habitList, (s) => s.context.habits);
  const [name, setName] = useState('');

  return (
    <View className="flex-1 p-4 bg-white dark:bg-black">
      <Text className="text-2xl font-bold text-center mb-4 text-blue-600">Your Habits</Text>
      <View className="flex-row mb-2 items-center justify-between gap-2">
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

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {habits.map((habit, index) => (
          <HabitCard key={index} habit={habit} index={index} habitList={habitList} />
        ))}
      </ScrollView>
    </View>
  );
}
