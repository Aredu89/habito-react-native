import AsyncStorage from '@react-native-async-storage/async-storage';

const HABITS_KEY = 'habito::habits';

export async function saveHabits(data: unknown) {
  try {
    const json = JSON.stringify(data);
    await AsyncStorage.setItem(HABITS_KEY, json);
  } catch (err) {
    console.error('Error saving habits:', err);
  }
}

export async function loadHabits<T = any[]>(): Promise<T | null> {
  try {
    const json = await AsyncStorage.getItem(HABITS_KEY);
    return json ? JSON.parse(json) : null;
  } catch (err) {
    console.error('Error loading habits:', err);
    return null;
  }
}
