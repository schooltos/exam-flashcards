# Flashcards React Native App

Мобільний додаток для навчання з картками. Реалізовано варіант 32: створення колод, додавання карток у форматі питання/відповідь, режим вивчення з перевертанням картки по тапу.

## Функції

- список навчальних колод;
- створення нової колоди;
- додавання карток з питанням і відповіддю;
- перегляд карток у межах конкретної колоди;
- видалення карток та колод;
- режим вивчення з анімованим перевертанням картки;
- локальне збереження даних через AsyncStorage;
- демо-дані для першого запуску.

## Запуск

```bash
npm install
npm start
```

Для запуску на Android:

```bash
npm run android
```

Для запуску на iOS:

```bash
npm run ios
```

## Структура

```text
src/
  components/   reusable UI components
  constants/    colors, spacing, radii
  context/      state management for decks and cards
  data/         initial demo data
  navigation/   stack navigation
  screens/      application screens
  storage/      AsyncStorage helpers
```
