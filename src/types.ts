export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
};

export type Deck = {
  id: string;
  title: string;
  description: string;
  cards: Flashcard[];
  createdAt: string;
  updatedAt: string;
};

export type RootStackParamList = {
  Decks: undefined;
  DeckDetails: { deckId: string };
  AddDeck: undefined;
  AddCard: { deckId: string };
  Study: { deckId: string };
};

export type NewDeckInput = {
  title: string;
  description: string;
};

export type NewCardInput = {
  question: string;
  answer: string;
};
