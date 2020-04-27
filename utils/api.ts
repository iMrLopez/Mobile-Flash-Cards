import { AsyncStorage } from "react-native";

const FLASHCARD_DB_KEY = "FlashCards:cards";

export function starterDecks(deck) {
  return AsyncStorage.setItem(
    FLASHCARD_DB_KEY,
    JSON.stringify({
      [deck.deckId]: deck,
    })
  );
}

export function addDeck(deck) {
  const deckObject = deck;
  return AsyncStorage.mergeItem(
    FLASHCARD_DB_KEY,
    JSON.stringify({ [deck.deckId]: deck })
  ).then(() => deckObject);
}

export function fetchAllDecks() {
  return AsyncStorage.getItem(FLASHCARD_DB_KEY).then((decks) =>
  {
    if (decks) {
      return Object.values(JSON.parse(decks))
    }
  }
  );
}

export function addCard(deckId, card) {
  return AsyncStorage.getItem(FLASHCARD_DB_KEY).then((stringifiedDecks) => {
    let decks = JSON.parse(stringifiedDecks);
    let deckKeys = Object.keys(decks);

    deckKeys.forEach((deckKey) => {
      let deck = decks[deckKey];
      if (deck.deckId === deckId) deck.cards = [...deck.cards, card];
    });
    let stringifiedUpdatedDecks = JSON.stringify(decks);
    AsyncStorage.setItem(FLASHCARD_DB_KEY, stringifiedUpdatedDecks);
    return Object.values(decks);
  });
}
