import { View, Text } from 'react-native'
import React from 'react'
import Button from './components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button label="Primary Button" variant="primary" onPress={() => console.log('Primary Button Pressed')} />
    </SafeAreaView>
  )
}

export default App