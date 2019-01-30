import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

function CorrectBtn () {
  return (
    <TouchableOpacity>
      <Text>Correct</Text>
    </TouchableOpacity>
  )
}

function IncorrectBtn () {
  return (
    <TouchableOpacity>
      <Text>Incorrect</Text>
    </TouchableOpacity>
  )
}

class Quiz extends Component {

  state = {
  }

  render () {
    return (
      <View>
        <Text style={styles.text}>Deck</Text>
        <CorrectBtn />
        <IncorrectBtn />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  }
})

export default Quiz