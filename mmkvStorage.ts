import { createMMKV, type MMKV } from 'react-native-mmkv';

let storageInstance: MMKV | null = null;
try {
  storageInstance = createMMKV({ id: 'smokelog-storage' });
} catch (err) {
  console.warn(
    '[mmkvStorage] Failed to initialize react-native-mmkv instance. Falling back to safe memory mode.',
    err
  );
}

export const storage = storageInstance;

// Centralized keys so nothing typos a string key in two different places.
export const STORAGE_KEYS = {
  LAST_SMOKED_AT: 'last_smoked_at',
  SMOKE_LOG_HISTORY: 'smoke_log_history',
} as const;

const MAX_HISTORY_ENTRIES = 500; // bound storage growth — trim oldest first
const MIN_VALID_TIMESTAMP = new Date('2020-01-01T00:00:00Z').getTime();
const FUTURE_TOLERANCE_MS = 5 * 60 * 1000; // allow 5 min of clock skew

function isValidTimestamp(value: unknown, nowTs: number): value is number {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    Number.isInteger(value) &&
    value >= MIN_VALID_TIMESTAMP &&
    value <= nowTs + FUTURE_TOLERANCE_MS
  );
}

/**
 * Every read/write goes through these instead of touching `storage`
 * directly, so a corrupted store or a native-module hiccup degrades to
 * "acts like empty storage" instead of crashing the app.
 */
export const safeStorage = {
  getNumber(key: string): number | null {
    if (!storage) return null;
    try {
      const value = storage.getNumber(key);
      return value === undefined ? null : value;
    } catch (err) {
      console.warn(`[safeStorage] Failed to read "${key}"`, err);
      return null;
    }
  },

  setNumber(key: string, value: number): boolean {
    if (!storage) return false;
    try {
      storage.set(key, value);
      return true;
    } catch (err) {
      console.warn(`[safeStorage] Failed to write "${key}"`, err);
      return false;
    }
  },

  getHistory(): number[] {
    if (!storage) return [];
    try {
      const raw = storage.getString(STORAGE_KEYS.SMOKE_LOG_HISTORY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      // Defend against corrupted JSON that parses but isn't what we expect.
      if (!Array.isArray(parsed)) return [];
      const now = Date.now();
      return parsed.filter((n): n is number => isValidTimestamp(n, now));
    } catch (err) {
      console.warn('[safeStorage] Failed to read history, resetting', err);
      return [];
    }
  },

  appendToHistory(timestamp: number): boolean {
    if (!storage) return false;
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
    if (!storage) return false;
    try {
      storage.clearAll();
      return true;
    } catch (err) {
      console.warn('[safeStorage] Failed to clear storage', err);
      return false;
    }
  },
};