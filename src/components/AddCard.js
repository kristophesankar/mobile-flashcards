import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

function SubmitBtn () {
  return (
    <TouchableOpacity>
      <Text>Submit</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {

  state = {
    question: '',
    answer: ''
  }

  render () {
    return (
      <View>
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
        <SubmitBtn />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  }
})

export default AddCard