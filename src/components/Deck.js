import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

function AddCardBtn () {
  return (
    <TouchableOpacity>
      <Text>Add Card</Text>
    </TouchableOpacity>
  )
}

function StartQuizBtn () {
  return (
    <TouchableOpacity>
      <Text>Start Quiz</Text>
    </TouchableOpacity>
  )
}

class Deck extends Component {

  state = {
  }

  render () {
    return (
      <View>
        <Text style={styles.text}>Deck</Text>
        <AddCardBtn />
        <StartQuizBtn />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  }
})

export default Deck