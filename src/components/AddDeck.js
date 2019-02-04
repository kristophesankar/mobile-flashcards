import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { timeToString } from '../utils/helpers'
import { submitDeck } from '../utils/api'
import { withNavigation } from 'react-navigation'

class AddDeck extends Component {

  state = {
    id: '',
    title: '',
    cards: []
  }

  componentDidMount () {
    const key = timeToString()
    this.setState({id: key})
  }


  submit = () => {

    const deck = this.state
    const { id } = this.state
    const { navigation } = this.props

    this.props.dispatch(addDeck({
      [id]: deck
    }))

    this.setState(() => ({ id: '', title: '', cards: [] }))
    submitDeck({ key: id, deck })

    this.props.navigation.navigate( 'Deck', { deck } )
  }

  render () {
    return (
      <KeyboardAvoidingView behavior="padding" style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text}>Add Deck</Text>
        <Text style={styles.paragraph}>Please enter a title for your new deck.</Text>
        <TextInput
          style={styles.input}
          placeholder='type here...'
          onChangeText={(text) => this.setState({title: text})}
          value={this.state.title}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={this.submit}>
          <Text style={{fontSize: 20, color: '#fff'}}>SUBMIT</Text>
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
    borderBottomWidth: 1
  },
  submitBtn: {
    marginTop: 50,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#43cbef',
    color: '#fff',
    margin: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    borderRadius: 10,
  }
})

export default connect()(withNavigation(AddDeck))