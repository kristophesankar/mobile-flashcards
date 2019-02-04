import React, { Component } from 'react'
import DeckList from './src/components/DeckList'
import Deck from './src/components/Deck'
import AddDeck from './src/components/AddDeck'
import AddCard from './src/components/AddCard'
import Quiz from './src/components/Quiz'
import { Constants } from 'expo'
import { StyleSheet, Text, View, Platform, StatusBar, ScrollView} from 'react-native'
import { createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/reducers'
import middleware from './src/middleware'
import { setLocalNotification } from './src/utils/helpers.js'

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
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <DeckList />
      </ScrollView>
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

class DeckScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Deck />
      </ScrollView>
    );
  }
}

const TabNavigator = createMaterialTopTabNavigator({
  'Decks': DecksListScreen,
  'Add Deck': AddDeckScreen,
});

const Tabs = createAppContainer(TabNavigator);

const StackNavigator = createStackNavigator({
  Home:{
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#43cbef",
      },
    }),
  },
  AddCard:{
    screen: AddCard,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#43cbef",
      },
    }),
  },
  Quiz:{
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#43cbef",
      },
    }),
  },
})

const Stack = createAppContainer(StackNavigator);

const store = createStore(reducer, middleware)

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor='#000' barStyle="light-content" />
          <Stack />
        </View>
      </Provider>
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
