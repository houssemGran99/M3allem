import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'm3allem.auth.token';

let currentToken: string | null = null;

export function getCurrentToken(): string | null {
  return currentToken;
}

export async function loadPersistedToken(): Promise<string | null> {
  const stored = await AsyncStorage.getItem(TOKEN_KEY);
  currentToken = stored;
  return stored;
}

export async function persistToken(token: string): Promise<void> {
  currentToken = token;
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function clearPersistedToken(): Promise<void> {
  currentToken = null;
  await AsyncStorage.removeItem(TOKEN_KEY);
}
