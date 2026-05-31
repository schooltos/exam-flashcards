import React, { useLayoutEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CardRow } from '../components/CardRow';
import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { colors, radii, spacing } from '../constants/theme';
import { useFlashcards } from '../context/FlashcardsContext';
import { Flashcard, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'DeckDetails'>;

export function DeckDetailsScreen({ navigation, route }: Props) {
  const { getDeckById, deleteDeck, deleteCard } = useFlashcards();
  const deck = getDeckById(route.params.deckId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: deck?.title ?? 'Колода' });
  }, [deck?.title, navigation]);

  if (!deck) {
    return (
      <Screen>
        <EmptyState
          title="Колоду не знайдено"
          description="Ймовірно, її було видалено або дані не встигли оновитися."
          actionTitle="До списку колод"
          onActionPress={() => navigation.navigate('Decks')}
        />
      </Screen>
    );
  }

  const handleDeleteDeck = () => {
    Alert.alert(
      'Видалити колоду?',
      'Усі картки всередині цієї колоди також буде видалено.',
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            await deleteDeck(deck.id);
            navigation.navigate('Decks');
          }
        }
      ]
    );
  };

  const handleDeleteCard = (cardId: string) => {
    Alert.alert(
      'Видалити картку?',
      'Цю дію не можна буде скасувати.',
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Видалити', style: 'destructive', onPress: () => deleteCard(deck.id, cardId) }
      ]
    );
  };

  const renderCard = ({ item, index }: { item: Flashcard; index: number }) => (
    <CardRow card={item} index={index} onDelete={() => handleDeleteCard(item.id)} />
  );

  return (
    <Screen contentStyle={styles.screenContent}>
      <FlatList
        data={deck.cards}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={deck.cards.length === 0 ? styles.emptyList : styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.summaryCard}>
              <Text style={styles.deckTitle}>{deck.title}</Text>
              <Text style={styles.deckDescription}>{deck.description || 'Опис колоди не додано.'}</Text>
              <View style={styles.statsRow}>
                <View style={styles.statPill}>
                  <Text style={styles.statValue}>{deck.cards.length}</Text>
                  <Text style={styles.statLabel}>карток</Text>
                </View>
                <View style={styles.statPill}>
                  <Text style={styles.statValue}>{deck.cards.length > 0 ? 'Готово' : 'Порожньо'}</Text>
                  <Text style={styles.statLabel}>стан</Text>
                </View>
              </View>
            </View>

            <View style={styles.actions}>
              <PrimaryButton
                title="Вивчати"
                onPress={() => navigation.navigate('Study', { deckId: deck.id })}
                disabled={deck.cards.length === 0}
                style={styles.actionButton}
              />
              <PrimaryButton
                title="Додати"
                variant="secondary"
                onPress={() => navigation.navigate('AddCard', { deckId: deck.id })}
                style={styles.actionButton}
              />
            </View>

            <Text style={styles.sectionTitle}>Картки</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="У цій колоді ще немає карток"
            description="Додайте перше питання й відповідь. Після цього стане доступний режим вивчення."
            actionTitle="Додати картку"
            onActionPress={() => navigation.navigate('AddCard', { deckId: deck.id })}
          />
        }
        ListFooterComponent={
          <PrimaryButton title="Видалити колоду" variant="danger" onPress={handleDeleteDeck} style={styles.deleteDeckButton} />
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
    gap: spacing.md,
    marginBottom: spacing.md
  },
  summaryCard: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm
  },
  deckTitle: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900'
  },
  deckDescription: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm
  },
  statPill: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    padding: spacing.md
  },
  statValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900'
  },
  statLabel: {
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 13,
    fontWeight: '700'
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  actionButton: {
    flex: 1
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginTop: spacing.sm
  },
  separator: {
    height: spacing.sm
  },
  deleteDeckButton: {
    marginTop: spacing.lg
  }
});
