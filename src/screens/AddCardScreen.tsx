import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { TextField } from '../components/TextField';
import { colors, spacing } from '../constants/theme';
import { useFlashcards } from '../context/FlashcardsContext';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddCard'>;

export function AddCardScreen({ navigation, route }: Props) {
  const { addCard, getDeckById } = useFlashcards();
  const deck = getDeckById(route.params.deckId);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionError, setQuestionError] = useState('');
  const [answerError, setAnswerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    let hasError = false;

    if (question.trim().length < 3) {
      setQuestionError('Питання має містити щонайменше 3 символи.');
      hasError = true;
    } else {
      setQuestionError('');
    }

    if (answer.trim().length < 2) {
      setAnswerError('Відповідь має містити щонайменше 2 символи.');
      hasError = true;
    } else {
      setAnswerError('');
    }

    if (hasError) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addCard(route.params.deckId, { question, answer });
      navigation.goBack();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen scroll>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.form}>
        <Text style={styles.heading}>Нова картка</Text>
        <Text style={styles.description}>
          {deck ? `Колода: ${deck.title}` : 'Додайте питання та відповідь для навчальної картки.'}
        </Text>

        <TextField
          label="Питання"
          value={question}
          onChangeText={setQuestion}
          placeholder="Наприклад: What does market share mean?"
          multiline
          error={questionError}
          maxLength={260}
        />

        <TextField
          label="Відповідь"
          value={answer}
          onChangeText={setAnswer}
          placeholder="Напишіть коротку відповідь"
          multiline
          error={answerError}
          maxLength={360}
        />

        <PrimaryButton title="Додати картку" onPress={handleSubmit} loading={isSubmitting} />
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
