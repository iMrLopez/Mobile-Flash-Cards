import * as api from "../utils/api";

export const CREATE_DECK = "CREATE_DECK";
export const CREATE_QUESTION = "CREATE_QUESTION";
export const READ_DECKS = "READ_DECKS";
export const GET_DECK = "GET_DECK";

export const addNewDeck = (deck) => (dispatch) => {
  api.addDeck(deck).then((deckObject) => {
      dispatch({
        type: "CREATE_DECK",
        deckObject,
      });
    });
};

export const getAllDecks = () => (dispatch) => {
  api.fetchAllDecks().then((decks) =>
    dispatch({
      type: READ_DECKS,
      decks,
    })
  );
};

export const getOneDeck = (deckId) => (dispatch) => {
  dispatch({
    type: GET_DECK,
    deckId,
  });
};

export const addNewCard = (deckId, card) => (dispatch) => {
  api.addCard(deckId, card).then((decks) =>
    dispatch({
      type: CREATE_QUESTION,
      decks,
      deckId,
    })
  );
};
