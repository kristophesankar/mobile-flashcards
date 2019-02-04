import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { fetchDecks, removeDeck } from '../utils/api'
import { receiveDecks, addDeck } from '../actions'
import { connect } from 'react-redux'
import Deck from './Deck'
import { withNavigation } from 'react-navigation'

function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
}

class DeckList extends Component {

  componentDidMount () {
    const { dispatch } = this.props
    const decks = fetchDecks()
      .then((decks) => dispatch(receiveDecks(JSON.parse(decks))))
  }

  removeDeck = () => {
    const remove = removeDeck()
  }

  render () {

    const { decks } = this.props

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        {
          isEmpty(decks)
          ? <Text style={styles.text}>There's nothing here :(</Text>
          : Object.keys(decks).map((key) => (
              <TouchableOpacity key={key} style={styles.container}
                onPress={() => this.props.navigation.navigate(
                  'Deck',
                  { deck: decks[key] }
                )}>
                <Text style={{fontSize: 30, color: '#fff'}} >{decks[key].title}</Text>
                <Text style={{fontSize: 30, color: '#fff'}} >
                  Cards: {decks[key].cards.length}
                </Text>
              </TouchableOpacity>
            ))
        }
        <TouchableOpacity onPress={() => this.removeDeck()}>
          <Text style={{ color: '#ff0000', marginTop: 20}}>Remove All</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  container: {
    borderRadius: 10,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: '#43cbef',
    margin: 15,
    borderColor: '#000',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(withNavigation(DeckList))