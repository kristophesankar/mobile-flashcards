import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import {
  getTimeToString,
  dailyReminderMessage,
  removeNotification,
  setLocalNotification
} from '../utils/helpers'

//quiz component
class Quiz extends Component {

  state = {
    deck: '',
    current: 0,
    correct: 0,
    incorrect: 0,
    totalCorrect: 0,
    quizEnd: false,
    answerView : false,
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title
    }
  }

  componentDidMount(){
    const { navigation } = this.props
    const { deckId } = navigation.state.params
    const deck = this.props.decks[deckId]
    this.setState(() => ({ deck }))
    removeNotification().then(setLocalNotification)
  }

  handleCorrect = () => {
    let { correct, deck, current, quizEnd, answerView } = this.state
    correct = correct + 1
    if (current < deck.cards.length-1) {
      current = current + 1
    }else{
      quizEnd = true
    }
    answerView = false
    this.setState({correct, current, quizEnd, answerView})
  }

  handleIncorrect = () => {
    let { incorrect, deck, current, quizEnd } = this.state
    incorrect = incorrect + 1
    if (current < deck.cards.length-1) {
      current = current + 1
    }else{
      quizEnd = true
    }
    answerView = false
    this.setState({incorrect, current, quizEnd, answerView})
  }

  resetState = () => {
    this.setState({
      current: 0,
      correct: 0,
      incorrect: 0,
      totalCorrect: 0,
      quizEnd: false
    })
  }

  render () {
    const { deck, current, quizEnd, correct, incorrect, answerView } = this.state

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
          quizEnd === true
            ? <View style={styles.container}>
                <Text style={{fontSize: 40}}>End of quiz</Text>
                <Text style={{fontSize: 20}}>Correct: {correct}</Text>
                <Text style={{fontSize: 20}}>Inorrect: {incorrect}</Text>
                <TouchableOpacity style={styles.correctBtn}
                  onPress={() => this.props.navigation.navigate(
                    'Deck',
                    {
                      deck
                    }
                  )}>
                  <Text style={styles.btnText}>Back to Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.correctBtn}
                  onPress={this.resetState}>
                  <Text style={styles.btnText}>Restart Quiz</Text>
                </TouchableOpacity>
              </View>
            : deck.cards === undefined || deck.cards.length === 0
              ? <Text style={{fontSize: 20}}>You have no cards in this deck :(</Text>
              : <View style={styles.container}>
                  <Text style={{fontSize: 20}}>Card ({current+1}/ {deck.cards.length })</Text>
                    {
                      answerView
                        ? <View style={styles.container}>
                            <Text style={styles.text}>Answer:</Text>
                            <Text
                              style={styles.questiontext}>
                                {deck.cards[current].answer}
                              </Text>
                              <TouchableOpacity
                                onPress={() => this.setState({answerView: false})}>
                                <Text style={styles.a}>View Question</Text>
                              </TouchableOpacity>
                          </View>
                        : <View style={styles.container}>
                            <Text style={styles.text}>Question:</Text>
                            <Text
                              style={styles.questiontext}>
                                {deck.cards[current].question}
                              </Text>
                              <TouchableOpacity
                                onPress={() => this.setState({answerView: true})}>
                                <Text style={styles.a}>View Answer</Text>
                              </TouchableOpacity>
                          </View>
                    }
                  <TouchableOpacity style={styles.correctBtn}
                    onPress={this.handleCorrect}>
                    <Text style={styles.btnText}>Correct</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.incorrectBtn}
                    onPress={this.handleIncorrect}>
                    <Text style={styles.btnText}>Incorrect</Text>
                  </TouchableOpacity>
                </View>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  a: {
    marginTop: 25,
    alignItems: 'center',
    backgroundColor: '#fff',
    color: '#ff0000',
    margin: 15,
    marginBottom: 25,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    borderRadius: 10,
  },
  questiontext:{
    fontSize: 50
  },
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
  correctBtn: {
    marginTop: 10,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4dccce',
    color: '#fff',
    margin: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    borderRadius: 10,
  },
  incorrectBtn: {
    marginTop: 10,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#c73c3c',
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

export default connect(mapStateToProps)(withNavigation(Quiz))