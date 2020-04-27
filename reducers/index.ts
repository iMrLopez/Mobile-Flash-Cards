import { combineReducers } from "redux";
import {
  CREATE_DECK,
  CREATE_QUESTION,
  READ_DECKS,
  GET_DECK,
} from "../actions";
import { setStarterDecks, startingDeck } from "../utils/helpers";

export const initalAppState = {
  decks: [],
  singleDeck: {},
};

function allDecks(state = initalAppState, action) {
  switch (action.type) {
    case CREATE_DECK:
      let newDeck = { ...action.deckObject };
      return {
        decks: [...state.decks, newDeck],
        singleDeck: newDeck,
      };
    case CREATE_QUESTION:
      let editedSingleDeck = action.decks.filter(
        (deck) => deck.deckId === action.deckId
      );
      return {
        decks: action.decks,
        singleDeck: editedSingleDeck[0],
      };
    case READ_DECKS:
      let decks = undefined;
      if (action.decks === undefined) {
        setStarterDecks(startingDeck);
        decks = [startingDeck];
      } else if (action.decks.length > 0) {
        decks = action.decks;
      }
      return {
        decks: decks,
        singleDeck: state.singleDeck,
      };
    case GET_DECK:
      let singleDeck = state.decks.filter(
        (deck) => deck.deckId === action.deckId
      );
      return {
        decks: state.decks,
        singleDeck: singleDeck[0],
      };
    default:
      return state;
  }
}

export default combineReducers({
  allDecks,
});
