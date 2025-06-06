import { AppMachineContext } from '@/context/AppContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import 'react-native-reanimated';
import './global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AppMachineContext.Provider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppMachineContext.Provider>
  );
}
