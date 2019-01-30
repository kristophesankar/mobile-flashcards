import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class DeckList extends Component {
    render () {
      return (
        <View>
          <Text style={styles.text}>Deck List</Text>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  }
})

export default DeckList