import React, { Component } from 'react'
import DeckList from './src/components/DeckList'
import Deck from './src/components/Deck'
import AddDeck from './src/components/AddDeck'
import AddCard from './src/components/AddCard'
import Quiz from './src/components/Quiz'
import { Constants } from 'expo'
import { StyleSheet, Text, View, Platform, StatusBar} from 'react-native'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class DecksListScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DeckList />
      </View>
    );
  }
}

class AddDeckScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AddDeck />
      </View>
    );
  }
}

const TabNavigator = createMaterialTopTabNavigator({
  'Decks': DecksListScreen,
  'Add Card': AddDeckScreen,
});

const Tabs = createAppContainer(TabNavigator);

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppStatusBar backgroundColor='#000' barStyle="light-content" />
        <Tabs />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
