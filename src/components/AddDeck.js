import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

class AddDeck extends Component {

  state = {
    title: ''
  }

  submit = () => {
    //get state and
    //add deck to redux
  }

  render () {
    return (
      <View>
        <Text style={styles.text}>Add Deck</Text>
        <Text style={styles.text}>Please enter a title for your new deck.</Text>
        <TextInput
          style={styles.input}
          placeholder='type here...'
          onChangeText={(text) => this.setState({title: text})}
          value={this.state.title}
        />
        <TouchableOpacity>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  input: {
    marginTop: 10,
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderBottomWidth: 1
  }
})

export default AddDeck