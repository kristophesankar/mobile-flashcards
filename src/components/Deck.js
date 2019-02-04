import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

//individual deck component
class Deck extends Component {

  state = {
    deck: {}
  }

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return {
      title: deck.title
    }
  }

  componentDidMount () {
    const {navigation} = this.props
    const { deck } = navigation.state.params
    this.setState(() => ({ deck}))
  }

  render () {
    const { deck } = this.state

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text}>Deck Title: {deck.title}</Text>
        <Text style={styles.paragraph}>Cards: {
          deck.cards === undefined
            ? 0
            : deck.cards.length
        }</Text>
        <TouchableOpacity style={styles.btn}
          onPress={() => this.props.navigation.navigate(
            'AddCard',
            {
              title: `Add Card (${deck.title})`,
              deckId: deck.id
            }
          )}>
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}
          onPress={() => this.props.navigation.navigate(
            'Quiz',
            {
              title: `Quiz (${deck.title})`,
              deckId: deck.id
            }
          )}>
          <Text style={styles.btnText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: 1
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

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(withNavigation(Deck))