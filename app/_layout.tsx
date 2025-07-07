import { AppMachineContext } from '@/context/AppContext';
import { HabitListContext } from '@/context/HabitListContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { habitListMachine } from '@/machines/habitListMachine';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createActor } from 'xstate';

import 'react-native-reanimated';
import './global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const habitListActor = createActor(habitListMachine).start();

  return (
    <AppMachineContext.Provider>
      <HabitListContext.Provider value={habitListActor}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </HabitListContext.Provider>
    </AppMachineContext.Provider>
  );
}
