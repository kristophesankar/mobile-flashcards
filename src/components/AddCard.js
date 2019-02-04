import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks, addDeck, updateDeck } from '../actions'
import { fetchDecks, removeDeck, addCard, submitDeck } from '../utils/api'
import { timeToString } from '../utils/helpers'
import { withNavigation } from 'react-navigation'

//add card component

class AddCard extends Component {

  state = {
    id: '',
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title
    }
  }

  componentDidMount () {
    const key = timeToString()
    this.setState({id: key})
  }

  //submit function for adding a card
  submit = () => {

    const {navigation, dispatch} = this.props
    const { deckId } = navigation.state.params

    let deck = this.props.decks[deckId]
    const card = this.state
    const cards = deck.cards

    const cardsList = cards.concat(card)
    deck.cards = cardsList
    dispatch(updateDeck(
      deck
    ))
    submitDeck({ key: deck.id, deck })
    this.props.navigation.navigate(
      'Deck',
      {
        deck
      }
    )
  }

  // return UI
  render () {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text}>Add Card</Text>
        <TextInput
          style={styles.input}
          placeholder='question'
          onChangeText={(text) => this.setState({question: text})}
          value={this.state.question}
        />
        <TextInput
          style={styles.input}
          placeholder='answer'
          onChangeText={(text) => this.setState({answer: text})}
          value={this.state.answer}
        />
        <TouchableOpacity  style={styles.btn} onPress={this.submit}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  paragraph: {
    fontSize: 20
  },
  input: {
    marginTop: 50,
    fontSize: 20,
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    margin: 30
  },
  btn: {
    marginTop: 10,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#43cbef',
    color: '#fff',
    margin: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    color: '#fff'
  }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(withNavigation(AddCard))