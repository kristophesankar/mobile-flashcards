import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'MobileFlashcards:deck'

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function submitDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function removeDeck () {
  return AsyncStorage.removeItem(DECK_STORAGE_KEY)
}