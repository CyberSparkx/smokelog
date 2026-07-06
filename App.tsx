import { View, Text } from 'react-native'
import React from 'react'
import Button from './components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import LastSmokeCard from './components/Lastsmokecard'
import StatCard from './components/StatCard'

const App = () => {
  const demoLastSmokedAt = Date.now() - (3 * 60 + 42) * 60 * 1000;

  return (
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

    </SafeAreaView>
  )
}

export default App