import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/theme';
import { useFlashcards } from '../context/FlashcardsContext';
import { AddCardScreen } from '../screens/AddCardScreen';
import { AddDeckScreen } from '../screens/AddDeckScreen';
import { DeckDetailsScreen } from '../screens/DeckDetailsScreen';
import { DecksScreen } from '../screens/DecksScreen';
import { StudyScreen } from '../screens/StudyScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

export function AppNavigator() {
  const { isLoading } = useFlashcards();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTitleStyle: {
          color: colors.text,
          fontWeight: '900'
        },
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="Decks" component={DecksScreen} options={{ title: 'Flashcards' }} />
      <Stack.Screen name="DeckDetails" component={DeckDetailsScreen} options={{ title: 'Колода' }} />
      <Stack.Screen name="AddDeck" component={AddDeckScreen} options={{ title: 'Нова колода' }} />
      <Stack.Screen name="AddCard" component={AddCardScreen} options={{ title: 'Нова картка' }} />
      <Stack.Screen name="Study" component={StudyScreen} options={{ title: 'Режим вивчення' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background
  }
});
