import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import { safeStorage, STORAGE_KEYS } from './mmkvStorage';

export interface SmokeLogEntry {
  id: string;
  loggedAt: string; // ISO string, matches what <SmokeHistory /> expects
}

interface SmokeContextValue {
  lastSmokedAt: number | null;
  logs: SmokeLogEntry[];
  todayCount: number;
  monthCount: number;
  storageError: boolean;
  isHydrated: boolean;
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
  const [lastSmokedAt, setLastSmokedAt] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [storageError, setStorageError] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted state once on mount. MMKV is synchronous, so there's
  // no real async gap — this just keeps first-render safe in case the
  // native module isn't ready on the very first tick.
  useEffect(() => {
    const storedLast = safeStorage.getNumber(STORAGE_KEYS.LAST_SMOKED_AT);
    const storedHistory = safeStorage.getHistory();
    setLastSmokedAt(storedLast);
    setHistory(storedHistory);
    setIsHydrated(true);
  }, []);

  const logSmoke = useCallback(() => {
    const now = Date.now();

    const wroteTimestamp = safeStorage.setNumber(
      STORAGE_KEYS.LAST_SMOKED_AT,
      now
    );

    if (!wroteTimestamp) {
      // Don't update in-memory state as if it succeeded — that would
      // show a reset counter the user thinks was saved, but wasn't.
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

  // Derived, render-ready values — computed here once, not duplicated
  // in every screen that needs a count or a formatted log list.
  const logs: SmokeLogEntry[] = useMemo(
    () =>
      history
        .slice()
        .reverse() // newest first, typical for a history list
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
    isHydrated,
    logSmoke,
  };

  return (
    <SmokeContext.Provider value={value}>{children}</SmokeContext.Provider>
  );
};

/**
 * Throws clearly if used outside the provider, instead of silently
 * returning `undefined` and letting components crash later on
 * `.lastSmokedAt` of undefined with a confusing error.
 */
export function useSmoke(): SmokeContextValue {
  const ctx = useContext(SmokeContext);
  if (!ctx) {
    throw new Error('useSmoke() must be used inside a <SmokeProvider>');
  }
  return ctx;
}