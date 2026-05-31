import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, shadows, spacing } from '../constants/theme';
import { Deck } from '../types';

type DeckCardProps = {
  deck: Deck;
  onPress: () => void;
};

export function DeckCard({ deck, onPress }: DeckCardProps) {
  const cardsLabel = deck.cards.length === 1 ? '1 картка' : `${deck.cards.length} карток`;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{deck.title.slice(0, 1).toUpperCase()}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.count}>{cardsLabel}</Text>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>{deck.title}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {deck.description || 'Опис колоди не додано.'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    ...shadows.card
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }]
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: radii.full,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    color: colors.primaryDark,
    fontWeight: '900',
    fontSize: 18
  },
  meta: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceMuted
  },
  count: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700'
  },
  title: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900'
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21
  }
});
