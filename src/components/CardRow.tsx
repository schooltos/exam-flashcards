import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../constants/theme';
import { Flashcard } from '../types';

type CardRowProps = {
  card: Flashcard;
  index: number;
  onDelete: () => void;
};

export function CardRow({ card, index, onDelete }: CardRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.numberBox}>
        <Text style={styles.number}>{index + 1}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.question} numberOfLines={2}>{card.question}</Text>
        <Text style={styles.answer} numberOfLines={2}>{card.answer}</Text>
      </View>
      <Pressable onPress={onDelete} style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}>
        <Text style={styles.deleteText}>×</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  numberBox: {
    width: 34,
    height: 34,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    color: colors.textMuted,
    fontWeight: '800'
  },
  content: {
    flex: 1,
    gap: 3
  },
  question: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800'
  },
  answer: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 19
  },
  deleteButton: {
    width: 34,
    height: 34,
    borderRadius: radii.full,
    backgroundColor: colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteText: {
    color: colors.danger,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24
  },
  pressed: {
    opacity: 0.65
  }
});
