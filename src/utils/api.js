import { AsyncStorage } from 'react-native'

//storage key for async storage
const DECK_STORAGE_KEY = 'MobileFlashcards:deck'

//gets decks from local storage
export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

//function to save deck to local storage
export function submitDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

//remove all decks from local storage
export function removeDeck () {
  return AsyncStorage.removeItem(DECK_STORAGE_KEY)
}