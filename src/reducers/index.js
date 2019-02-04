import { ADD_DECK, RECEIVE_DECKS, UPDATE_DECK } from '../actions'

//redux reducer functions for decks

function decks ( state = {}, action ) {
  switch ( action.type ) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case UPDATE_DECK :
      return {
        ...state,
        [action.deck.id]: action.deck
      }
    default :
      return state
  }
}

export default decks