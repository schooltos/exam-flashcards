import { Deck } from '../types';

export const sampleDecks: Deck[] = [
  {
    id: 'deck-business-english',
    title: 'Business English',
    description: 'Терміни для ділового листування та презентацій.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    cards: [
      {
        id: 'card-1',
        question: 'What does “deadline” mean?',
        answer: 'A fixed date or time by which a task must be completed.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'card-2',
        question: 'Translate: “Ми цінуємо ваш лист від...”',
        answer: 'We appreciate your letter dated...',
        createdAt: new Date().toISOString()
      },
      {
        id: 'card-3',
        question: 'What is a follow-up email?',
        answer: 'An email sent after a previous contact to remind, clarify, or continue communication.',
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: 'deck-ui-basics',
    title: 'UI Basics',
    description: 'Основні поняття з розробки інтерфейсів користувача.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    cards: [
      {
        id: 'card-4',
        question: 'Що таке UX?',
        answer: 'User Experience — загальний досвід користувача під час взаємодії з продуктом.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'card-5',
        question: 'Навіщо потрібна ієрархія в інтерфейсі?',
        answer: 'Вона допомагає користувачу швидко зрозуміти, які елементи головні, а які другорядні.',
        createdAt: new Date().toISOString()
      }
    ]
  }
];
