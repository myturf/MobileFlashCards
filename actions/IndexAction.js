import {getDecks} from '../utils/DataApi';

export const FETCH_DECKS = 'FETCH_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const RESET = 'RESET';

export function fetchDecks(decks) {
  return {
    type: FETCH_DECKS,
    decks
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id
  };
}

export function addCardToDeck(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  };
}

export function reset() {
  return {
    type: RESET
  };
}

export function dispatchInitialData() {
  return dispatch => {
    return getDecks().then(decks => {
      dispatch(fetchDecks(decks));
    });
  };
}
