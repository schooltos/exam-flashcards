import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../constants/theme';
import { PrimaryButton } from './PrimaryButton';

type EmptyStateProps = {
  title: string;
  description: string;
  actionTitle?: string;
  onActionPress?: () => void;
};

export function EmptyState({ title, description, actionTitle, onActionPress }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>□</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionTitle && onActionPress && (
        <PrimaryButton title={actionTitle} onPress={onActionPress} style={styles.button} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  icon: {
    color: colors.primary,
    fontSize: 42,
    marginBottom: spacing.sm
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.xs
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center'
  },
  button: {
    marginTop: spacing.md,
    alignSelf: 'stretch'
  }
});
