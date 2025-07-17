import {
  addDays,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import { Text, View } from 'react-native';

// Props
interface HabitCalendarProps {
  completedDates: number[];
  mode: 'week' | 'month';
  referenceDate?: Date;
}

export function HabitCalendar({ completedDates, mode, referenceDate = new Date() }: HabitCalendarProps) {
  const completed = new Set(completedDates.map((d) => new Date(d).toDateString()));

  const today = new Date();
  const start =
    mode === 'week'
      ? startOfWeek(referenceDate, { weekStartsOn: 0 }) // Sunday
      : startOfWeek(startOfMonth(referenceDate), { weekStartsOn: 0 }); // Sunday before 1st of month

  const totalDays = mode === 'week' ? 7 : 42;
  const days = Array.from({ length: totalDays }, (_, i) => addDays(start, i));

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View>
      {/* Weekday header */}
      <View className="flex-row justify-between mb-2">
        {dayLabels.map((label) => (
          <Text key={label} className="flex-1 text-center text-xs font-medium text-gray-500">
            {label}
          </Text>
        ))}
      </View>

      {/* Calendar grid */}
      <View className="flex-row flex-wrap">
        {days.map((date, index) => {
          const isCompleted = completed.has(date.toDateString());
          const isToday = isSameDay(date, today);
          const isInactive = mode === 'month' && !isSameMonth(date, referenceDate);

          return (
            <View
              key={index}
              className="w-[14.28%] aspect-square items-center justify-center"
            >
              <View
                className={[
                  'w-6 h-6 rounded-full items-center justify-center',
                  isCompleted ? 'bg-blue-500' : 'bg-gray-200',
                  isInactive ? 'opacity-40' : '',
                  isToday ? 'border border-black dark:border-white' : '',
                ].join(' ')}
              >
                <Text className="text-xs text-white">
                  {date.getDate()}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}