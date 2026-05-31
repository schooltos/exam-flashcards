import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { TextField } from '../components/TextField';
import { colors, spacing } from '../constants/theme';
import { useFlashcards } from '../context/FlashcardsContext';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddDeck'>;

export function AddDeckScreen({ navigation }: Props) {
  const { addDeck } = useFlashcards();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (title.trim().length < 3) {
      setTitleError('Назва має містити щонайменше 3 символи.');
      return;
    }

    setTitleError('');
    setIsSubmitting(true);

    try {
      const deck = await addDeck({ title, description });
      navigation.replace('DeckDetails', { deckId: deck.id });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen scroll>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.form}>
        <Text style={styles.heading}>Створення нової колоди</Text>
        <Text style={styles.description}>
          Колода об’єднує картки однієї теми. Наприклад: англійська лексика, UI-поняття або питання до іспиту.
        </Text>

        <TextField
          label="Назва колоди"
          value={title}
          onChangeText={setTitle}
          placeholder="Наприклад: International Business"
          error={titleError}
          maxLength={60}
        />

        <TextField
          label="Опис"
          value={description}
          onChangeText={setDescription}
          placeholder="Коротко поясніть, для чого ця колода"
          multiline
          maxLength={180}
        />

        <PrimaryButton title="Зберегти колоду" onPress={handleSubmit} loading={isSubmitting} />
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md
  },
  heading: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900'
  },
  description: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23
  }
});
