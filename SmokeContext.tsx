import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import { safeStorage, STORAGE_KEYS } from './mmkvStorage';

export interface SmokeLogEntry {
  id: string;
  loggedAt: string; 
}

interface SmokeContextValue {
  lastSmokedAt: number | null;
  logs: SmokeLogEntry[];
  todayCount: number;
  monthCount: number;
  storageError: boolean;
  logSmoke: () => void;
}

const SmokeContext = createContext<SmokeContextValue | undefined>(undefined);

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth()
  );
}

export const SmokeProvider = ({ children }: { children: ReactNode }) => {
  const [lastSmokedAt, setLastSmokedAt] = useState<number | null>(() =>
    safeStorage.getNumber(STORAGE_KEYS.LAST_SMOKED_AT)
  );
  const [history, setHistory] = useState<number[]>(() =>
    safeStorage.getHistory()
  );
  const [storageError, setStorageError] = useState(false);

  const logSmoke = useCallback(() => {
    const now = Date.now();

    const wroteTimestamp = safeStorage.setNumber(
      STORAGE_KEYS.LAST_SMOKED_AT,
      now
    );

    if (!wroteTimestamp) {
      setStorageError(true);
      return;
    }

    const wroteHistory = safeStorage.appendToHistory(now);

    setLastSmokedAt(now);
    setStorageError(false);
    if (wroteHistory) {
      setHistory((prev) => [...prev, now]);
    }
  }, []);

  const logs: SmokeLogEntry[] = useMemo(
    () =>
      history
        .slice()
        .reverse() 
        .map((ts) => ({
          id: String(ts),
          loggedAt: new Date(ts).toISOString(),
        })),
    [history]
  );

  const todayCount = useMemo(() => {
    const now = new Date();
    return history.filter((ts) => isSameDay(new Date(ts), now)).length;
  }, [history]);

  const monthCount = useMemo(() => {
    const now = new Date();
    return history.filter((ts) => isSameMonth(new Date(ts), now)).length;
  }, [history]);

  const value: SmokeContextValue = {
    lastSmokedAt,
    logs,
    todayCount,
    monthCount,
    storageError,
    logSmoke,
  };

  return (
    <SmokeContext.Provider value={value}>{children}</SmokeContext.Provider>
  );
};

export function useSmoke(): SmokeContextValue {
  const ctx = useContext(SmokeContext);
  if (!ctx) {
    throw new Error('useSmoke() must be used inside a <SmokeProvider>');
  }
  return ctx;
}