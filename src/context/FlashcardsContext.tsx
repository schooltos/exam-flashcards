import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { sampleDecks } from '../data/sampleData';
import { loadDecks, saveDecks } from '../storage/flashcardStorage';
import { Deck, Flashcard, NewCardInput, NewDeckInput } from '../types';

const createId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const normalize = (value: string) => value.trim().replace(/\s+/g, ' ');

type FlashcardsContextValue = {
  decks: Deck[];
  isLoading: boolean;
  getDeckById: (deckId: string) => Deck | undefined;
  addDeck: (input: NewDeckInput) => Promise<Deck>;
  deleteDeck: (deckId: string) => Promise<void>;
  addCard: (deckId: string, input: NewCardInput) => Promise<Flashcard>;
  deleteCard: (deckId: string, cardId: string) => Promise<void>;
  resetDemoData: () => Promise<void>;
};

const FlashcardsContext = createContext<FlashcardsContextValue | undefined>(undefined);

export function FlashcardsProvider({ children }: { children: React.ReactNode }) {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      try {
        const storedDecks = await loadDecks();
        const initialDecks = storedDecks ?? sampleDecks;

        if (!storedDecks) {
          await saveDecks(sampleDecks);
        }

        if (isMounted) {
          setDecks(initialDecks);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  const commitDecks = async (nextDecks: Deck[]) => {
    setDecks(nextDecks);
    await saveDecks(nextDecks);
  };

  const value = useMemo<FlashcardsContextValue>(() => ({
    decks,
    isLoading,
    getDeckById: (deckId: string) => decks.find((deck) => deck.id === deckId),
    addDeck: async (input: NewDeckInput) => {
      const now = new Date().toISOString();
      const deck: Deck = {
        id: createId('deck'),
        title: normalize(input.title),
        description: normalize(input.description),
        cards: [],
        createdAt: now,
        updatedAt: now
      };

      await commitDecks([deck, ...decks]);
      return deck;
    },
    deleteDeck: async (deckId: string) => {
      await commitDecks(decks.filter((deck) => deck.id !== deckId));
    },
    addCard: async (deckId: string, input: NewCardInput) => {
      const card: Flashcard = {
        id: createId('card'),
        question: normalize(input.question),
        answer: normalize(input.answer),
        createdAt: new Date().toISOString()
      };

      const nextDecks = decks.map((deck) => {
        if (deck.id !== deckId) {
          return deck;
        }

        return {
          ...deck,
          cards: [card, ...deck.cards],
          updatedAt: new Date().toISOString()
        };
      });

      await commitDecks(nextDecks);
      return card;
    },
    deleteCard: async (deckId: string, cardId: string) => {
      const nextDecks = decks.map((deck) => {
        if (deck.id !== deckId) {
          return deck;
        }

        return {
          ...deck,
          cards: deck.cards.filter((card) => card.id !== cardId),
          updatedAt: new Date().toISOString()
        };
      });

      await commitDecks(nextDecks);
    },
    resetDemoData: async () => {
      await commitDecks(sampleDecks);
    }
  }), [decks, isLoading]);

  return (
    <FlashcardsContext.Provider value={value}>
      {children}
    </FlashcardsContext.Provider>
  );
}

export function useFlashcards() {
  const context = useContext(FlashcardsContext);

  if (!context) {
    throw new Error('useFlashcards must be used inside FlashcardsProvider');
  }

  return context;
}
