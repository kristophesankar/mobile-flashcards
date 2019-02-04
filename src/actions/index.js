//actions for redux

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const UPDATE_DECK = 'UPDATE_DECK'

export function addDeck ( deck ) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function updateDeck ( deck ) {
  return {
    type: UPDATE_DECK,
    deck
  }
}

export function receiveDecks ( decks ) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}