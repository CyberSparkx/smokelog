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

const App = () => (
  <SafeAreaProvider>
    <SmokeProvider>
      <Screen />
    </SmokeProvider>
  </SafeAreaProvider>
);

export default App;