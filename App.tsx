import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Button from './components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import LastSmokeCard from './components/Lastsmokecard'
import StatCard from './components/StatCard'
import SmokeHistory from './components/SmokeHistory'

const App = () => {
  const demoLastSmokedAt = Date.now() - (3 * 60 + 42) * 60 * 1000;

  const demoLogs = [
  {
    id: '1',
    loggedAt: '2026-07-06T09:15:00',
  },
  {
    id: '2',
    loggedAt: '2026-07-06T12:40:00',
  },
  {
    id: '3',
    loggedAt: '2026-07-05T18:20:00',
  },
  {
    id: '4',
    loggedAt: '2026-07-04T08:05:00',
  },
  {
    id: '5',
    loggedAt: '2026-07-03T21:10:00',
  },
  {
    id: '6',
    loggedAt: '2026-07-02T15:45:00',
  },
  {
    id: '7',
    loggedAt: '2026-07-01T10:30:00',
  },
];

  return (
    // <ScrollView>
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        gap: 16,
      }}
    >

     
      <LastSmokeCard lastSmokedAt={demoLastSmokedAt} />
      <Button
        label="Primary Button"
        variant="primary"
        onPress={() => console.log('Primary Button Pressed')}
      />

      <View style={{ flexDirection: 'row', gap: 16 }}>
      <StatCard count={5} label="Today" />
      <StatCard count={17} label="This Week" />
      </View>
      <Text style={{ fontSize: 20, fontWeight: '600', color: '#333',}}>
              Smoke History
            </Text>

      <SmokeHistory logs={demoLogs} />
    </SafeAreaView>
//  </ScrollView>
  )
}

export default App