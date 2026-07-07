# Smokelog 🚭

A premium, robust React Native application built with TypeScript to log and track cigarette consumption. It features a real-time live counter, daily and monthly metrics, and a chronological history list, all backed by ultra-fast MMKV storage.

---

## 🌟 Key Features

### 1. **Real-time Live Counter Dashboard**
- Tracks the precise time elapsed (days, hours, minutes, seconds) since the last logged cigarette.
- Syncs perfectly with background/foreground app state changes by listening to `AppState` events.
- Zero layout shift: Synchronously loads values on boot to eliminate any zero-state screen flicker.

### 2. **Double-Tap Protection & Debounce**
- Captures logs instantly but debounces subsequent taps for `500ms`.
- Visually updates the button to `Logged! 🚭` and disables interaction during the cooldown to prevent double logging.

### 3. **Smart Statistics & History**
- **Today's count** & **Monthly count** computed efficiently using React's `useMemo` hooks.
- Beautiful, scrollable historical log list sorted by the latest entries first.

### 4. **Resilient Failure Fallbacks**
- **Native Safeguards**: Wraps the MMKV initialization so that if C++ native modules fail to load (such as in Expo Go or Jest test runner environments), the app degrades to a safe memory mode rather than hard-crashing.
- **Timestamp Validation**: Sanitizes stored records so clock skews or database corruptions don't throw statistics off.
- **Root Error Boundary**: Root-level `ErrorBoundary` intercepts layout or render-time errors, presenting a user-friendly recovery interface.

---

## 🛠️ Technology Stack

- **Core Framework**: React Native (0.86.0)
- **Programming Language**: TypeScript (5.8.3)
- **Local Persistence**: `react-native-mmkv` (v4.x, backed by Nitro Modules C++)
- **Safe Area Layout**: `react-native-safe-area-context`
- **Testing**: Jest & `react-test-renderer`

---

## 🏗️ Architectural Decisions

- **React Context API State Management**: Encapsulates all storage reads, writes, and computations inside `SmokeProvider` (`SmokeContext.tsx`). Components consume data cleanly via the custom `useSmoke()` hook.
- **Synchronous Persistence Hydration**: Because MMKV is built on C++ JSI bindings, database access is synchronous. We initialize state variables directly within the `useState` initializer function:
  ```typescript
  const [history, setHistory] = useState<number[]>(() => safeStorage.getHistory());
  ```
  This eliminates asynchronous `useEffect` layout flashes and ensures instant rendering on app start.
- **Memoized Derived Calculations**: The app avoids state redundancy. Instead, `logs`, `todayCount`, and `monthCount` are calculated on-the-fly using `useMemo` triggered only when the `history` array changes.
- **Storage Isolation**: Components never touch the raw MMKV module directly. The centralized `safeStorage` wrapper in `mmkvStorage.ts` acts as a clean facade managing JSON serialization/deserialization, type checks, and errors.

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have completed the React Native [Environment Setup Guide](https://reactnative.dev/docs/set-up-your-environment) for your operating system (Android/iOS SDKs).

### ⚙️ Step 1: Clone and Install Dependencies

Open a terminal at the root of the project:
```bash
npm install
```

### 📱 Step 2: iOS Native Setup (macOS only)

Install the native CocoaPods dependencies:
```bash
bundle install
bundle exec pod install
```

### ⚡ Step 3: Run the Development Server

Start the Metro bundler:
```bash
npm start
```

### 🤖 Step 4: Build and Run the App

With Metro running in a terminal, launch the platform client in another terminal:

#### For Android:
```bash
npm run android
```

#### For iOS:
```bash
npm run ios
```

---

## 🧪 Running Tests

Validate state logic, layout rendering, and component mocks:
```bash
npm test
```
The test suite utilizes built-in mocks for `react-native-mmkv` to isolate the native storage logic and verify dashboard rendering correctly.
