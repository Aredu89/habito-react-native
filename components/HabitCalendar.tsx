import dayjs from 'dayjs';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Props
interface HabitCalendarProps {
  completedDates: number[];
  mode: 'week' | 'month';
}

export function HabitCalendar({ completedDates, mode }: HabitCalendarProps) {
  const today = dayjs();
  const [monthOffset, setMonthOffset] = useState(0);
  const viewDate = today.add(monthOffset, 'month');
  const startOfMonth = viewDate.startOf('month');
  const endOfMonth = viewDate.endOf('month');

  const completedDaySet = new Set(
    completedDates.map((ts) => dayjs(ts).format('YYYY-MM-DD'))
  );

  // Generate week or month days
  let days: dayjs.Dayjs[] = [];

  if (mode === 'week') {
    const startOfWeek = today.startOf('week');
    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.add(i, 'day'));
    }
  } else {
    const daysInMonth = viewDate.daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(viewDate.date(i));
    }
  }

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View className="mt-4">
      {mode === 'month' && (
        <View className="flex-row justify-between items-center mb-2">
          <TouchableOpacity onPress={() => setMonthOffset((prev) => prev - 1)}>
            <Text className="text-blue-500">Previous</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold dark:text-white">
            {viewDate.format('MMMM YYYY')}
          </Text>
          <TouchableOpacity onPress={() => setMonthOffset((prev) => prev + 1)}>
            <Text className="text-blue-500">Next</Text>
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-row justify-between mb-2">
        {dayLabels.map((label) => (
          <Text key={label} className="flex-1 text-center text-xs font-medium text-gray-500">
            {label}
          </Text>
        ))}
      </View>

      <View className="flex-row flex-wrap justify-center">
        {days.map((day) => {
          const formatted = day.format('YYYY-MM-DD');
          const isCompleted = completedDaySet.has(formatted);
          const isToday = day.isSame(today, 'day');

          return (
            <View
              key={formatted}
              className="w-[13.5%] aspect-square items-center justify-center m-0.3"
            >
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  isCompleted ? 'bg-green-500' : 'border border-gray-300'
                } ${isToday ? 'ring-2 ring-blue-400' : ''}`}
              >
                <Text
                  className={`text-sm font-medium ${
                    isCompleted ? 'text-white' : 'text-black dark:text-white'
                  }`}
                >
                  {day.date()}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}