import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Button from './components/Button';
import LastSmokeCard from './components/Lastsmokecard';
import StatCard from './components/StatCard';
import SmokeHistory from './components/SmokeHistory';
import { SmokeProvider, useSmoke } from './SmokeContext';
import { theme } from './styles/Theme';

const Screen = () => {
  const { lastSmokedAt, logs, todayCount, monthCount, storageError, logSmoke } =
    useSmoke();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 16,
        backgroundColor: theme.background,
      }}
    >
      <LastSmokeCard lastSmokedAt={lastSmokedAt} />

      {storageError && (
        <Text style={{ color: '#F5A623', fontSize: 13, textAlign: 'center' }}>
          Couldn't save that log — check your device storage.
        </Text>
      )}

      <Button label="I smoked one" variant="primary" onPress={logSmoke} />

      <View style={{ flexDirection: 'row', gap: 16 }}>
        <StatCard count={todayCount} label="Today" />
        <StatCard count={monthCount} label="This Month" />
      </View>

      <Text style={{ fontSize: 20, fontWeight: '600', color: theme.textPrimary }}>
        Smoke History
      </Text>

      <View style={{ flex: 1 }}>
        <SmokeHistory logs={logs} />
      </View>
    </SafeAreaView>
  );
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn('[ErrorBoundary] Caught rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
            padding: 24,
            gap: 16,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.textPrimary,
              textAlign: 'center',
            }}
          >
            Something went wrong ⚠️
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme.textSecondary,
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            The application encountered an unexpected error.
          </Text>
          <Button
            label="Try Again"
            variant="primary"
            onPress={() => this.setState({ hasError: false })}
          />
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}

const App = () => (
  <SafeAreaProvider>
    <ErrorBoundary>
      <SmokeProvider>
        <Screen />
      </SmokeProvider>
    </ErrorBoundary>
  </SafeAreaProvider>
);

export default App;