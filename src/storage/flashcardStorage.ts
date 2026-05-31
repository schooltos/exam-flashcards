import AsyncStorage from '@react-native-async-storage/async-storage';
import { Deck } from '../types';

const STORAGE_KEY = '@flashcards:decks:v1';

export async function loadDecks(): Promise<Deck[] | null> {
  const rawValue = await AsyncStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

export async function saveDecks(decks: Deck[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}
