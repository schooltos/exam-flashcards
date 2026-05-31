import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FlashcardsProvider } from './src/context/FlashcardsContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <FlashcardsProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </NavigationContainer>
      </FlashcardsProvider>
    </SafeAreaProvider>
  );
}
