import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { colors, radii, shadows, spacing } from '../constants/theme';
import { useFlashcards } from '../context/FlashcardsContext';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Study'>;

export function StudyScreen({ navigation, route }: Props) {
  const { getDeckById } = useFlashcards();
  const deck = getDeckById(route.params.deckId);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const cards = deck?.cards ?? [];
  const currentCard = cards[index];
  const progress = cards.length > 0 ? ((index + 1) / cards.length) * 100 : 0;

  useLayoutEffect(() => {
    navigation.setOptions({ title: deck ? `Вивчення: ${deck.title}` : 'Режим вивчення' });
  }, [deck?.title, navigation]);

  useEffect(() => {
    setIsFlipped(false);
    flipAnimation.setValue(0);
  }, [index, flipAnimation]);

  if (!deck) {
    return (
      <Screen>
        <EmptyState
          title="Колоду не знайдено"
          description="Поверніться до списку колод і відкрийте потрібну колоду ще раз."
          actionTitle="До списку колод"
          onActionPress={() => navigation.navigate('Decks')}
        />
      </Screen>
    );
  }

  if (cards.length === 0 || !currentCard) {
    return (
      <Screen>
        <EmptyState
          title="Немає карток для вивчення"
          description="Спершу додайте хоча б одну картку з питанням і відповіддю."
          actionTitle="Додати картку"
          onActionPress={() => navigation.navigate('AddCard', { deckId: deck.id })}
        />
      </Screen>
    );
  }

  const frontRotation = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const backRotation = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg']
  });

  const handleFlip = () => {
    const nextValue = !isFlipped;
    setIsFlipped(nextValue);

    Animated.timing(flipAnimation, {
      toValue: nextValue ? 1 : 0,
      duration: 240,
      useNativeDriver: true
    }).start();
  };

  const goPrevious = () => {
    setIndex((currentIndex) => Math.max(0, currentIndex - 1));
  };

  const goNext = () => {
    setIndex((currentIndex) => Math.min(cards.length - 1, currentIndex + 1));
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.counter}>Картка {index + 1} з {cards.length}</Text>
          <Text style={styles.hint}>Торкніться картки, щоб перевернути</Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Pressable onPress={handleFlip} style={styles.cardPressArea}>
          <Animated.View
            style={[
              styles.flashcardFace,
              {
                transform: [{ perspective: 1000 }, { rotateY: frontRotation }]
              }
            ]}
          >
            <Text style={styles.faceLabel}>Питання</Text>
            <Text style={styles.faceText}>{currentCard.question}</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.flashcardFace,
              styles.backFace,
              {
                transform: [{ perspective: 1000 }, { rotateY: backRotation }]
              }
            ]}
          >
            <Text style={styles.faceLabel}>Відповідь</Text>
            <Text style={styles.faceText}>{currentCard.answer}</Text>
          </Animated.View>
        </Pressable>

        <View style={styles.controls}>
          <PrimaryButton title="Назад" variant="ghost" onPress={goPrevious} disabled={index === 0} style={styles.controlButton} />
          <PrimaryButton title={index === cards.length - 1 ? 'Завершити' : 'Далі'} onPress={index === cards.length - 1 ? () => navigation.goBack() : goNext} style={styles.controlButton} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.md
  },
  topBar: {
    gap: spacing.xs
  },
  counter: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900'
  },
  hint: {
    color: colors.textMuted,
    fontSize: 15
  },
  progressTrack: {
    height: 10,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: radii.full,
    backgroundColor: colors.primary
  },
  cardPressArea: {
    minHeight: 360,
    flex: 1,
    justifyContent: 'center'
  },
  flashcardFace: {
    position: 'absolute',
    left: 0,
    right: 0,
    minHeight: 320,
    borderRadius: radii.lg,
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    ...shadows.card
  },
  backFace: {
    backgroundColor: colors.primarySoft
  },
  faceLabel: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.md
  },
  faceText: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '900',
    textAlign: 'center'
  },
  controls: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingBottom: spacing.sm
  },
  controlButton: {
    flex: 1
  }
});
