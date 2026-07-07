import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({ id: 'smokelog-storage' });

// Centralized keys so nothing typos a string key in two different places.
export const STORAGE_KEYS = {
  LAST_SMOKED_AT: 'last_smoked_at',
  SMOKE_LOG_HISTORY: 'smoke_log_history',
} as const;

const MAX_HISTORY_ENTRIES = 500; // bound storage growth — trim oldest first

/**
 * Every read/write goes through these instead of touching `storage`
 * directly, so a corrupted store or a native-module hiccup degrades to
 * "acts like empty storage" instead of crashing the app.
 */
export const safeStorage = {
  getNumber(key: string): number | null {
    try {
      const value = storage.getNumber(key);
      return value === undefined ? null : value;
    } catch (err) {
      console.warn(`[safeStorage] Failed to read "${key}"`, err);
      return null;
    }
  },

  setNumber(key: string, value: number): boolean {
    try {
      storage.set(key, value);
      return true;
    } catch (err) {
      console.warn(`[safeStorage] Failed to write "${key}"`, err);
      return false;
    }
  },

  getHistory(): number[] {
    try {
      const raw = storage.getString(STORAGE_KEYS.SMOKE_LOG_HISTORY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      // Defend against corrupted JSON that parses but isn't what we expect.
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (n): n is number => typeof n === 'number' && Number.isFinite(n)
      );
    } catch (err) {
      console.warn('[safeStorage] Failed to read history, resetting', err);
      return [];
    }
  },

  appendToHistory(timestamp: number): boolean {
    try {
      const current = safeStorage.getHistory();
      const updated = [...current, timestamp].slice(-MAX_HISTORY_ENTRIES);
      storage.set(STORAGE_KEYS.SMOKE_LOG_HISTORY, JSON.stringify(updated));
      return true;
    } catch (err) {
      console.warn('[safeStorage] Failed to append history', err);
      return false;
    }
  },

  clearAll(): boolean {
    try {
      storage.clearAll();
      return true;
    } catch (err) {
      console.warn('[safeStorage] Failed to clear storage', err);
      return false;
    }
  },
};