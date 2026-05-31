import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DeckCard } from '../components/DeckCard';
import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { colors, spacing } from '../constants/theme';
import { useFlashcards } from '../context/FlashcardsContext';
import { Deck, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Decks'>;

export function DecksScreen({ navigation }: Props) {
  const { decks, resetDemoData } = useFlashcards();

  const renderDeck = ({ item }: { item: Deck }) => (
    <DeckCard deck={item} onPress={() => navigation.navigate('DeckDetails', { deckId: item.id })} />
  );

  return (
    <Screen contentStyle={styles.screenContent}>
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        renderItem={renderDeck}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={decks.length === 0 ? styles.emptyList : styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Мої навчальні колоди</Text>
            <Text style={styles.subtitle}>
              Створюйте теми, додавайте питання й відповіді та перевіряйте себе в режимі карток.
            </Text>
            <View style={styles.actions}>
              <PrimaryButton title="Створити колоду" onPress={() => navigation.navigate('AddDeck')} style={styles.actionButton} />
              <PrimaryButton title="Демо" variant="ghost" onPress={resetDemoData} style={styles.demoButton} />
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="Колоди ще не створено"
            description="Додайте першу колоду, щоб почати створювати картки для навчання."
            actionTitle="Додати колоду"
            onActionPress={() => navigation.navigate('AddDeck')}
          />
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingTop: 0
  },
  listContent: {
    paddingBottom: spacing.xl
  },
  emptyList: {
    flexGrow: 1,
    paddingBottom: spacing.xl
  },
  header: {
    gap: spacing.sm,
    marginBottom: spacing.lg
  },
  title: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900'
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm
  },
  actionButton: {
    flex: 1
  },
  demoButton: {
    width: 92
  },
  separator: {
    height: spacing.md
  }
});
