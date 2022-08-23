// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Card from './components/Card';
import randomWords from 'random-words';
import Results from './components/Results';

class Word {
  constructor(word, status) {
    this.word = word;
    this.status = status;
  }
}

export default class App extends Component {
  constructor() {
    // why we use super()
    // https://stackoverflow.com/questions/40433463/what-does-calling-super-in-a-react-constructor-do   
    super();
    this.state = {
    };
  }
  
  /**
   * Starts timer when the game starts and updates time left every second
   */
  timer = () => {

  }

  /**
   * @returns array of @Word objects
   */
  getWords = () => {

  }

  /**
   * Moves to next word.
   * Updates words with new words if current index is at the end of array
   */
  nextWord = () => {

  }

  /**
   * Validates current user input and handles score updates.
   * Calls next word when current word is done
   * @param {*} event 
   */
  handleUserInput = (event) => {
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mt-4">
                {/* <Card words={this.state.words} inputHandler={this.handleUserInput} timer={this.state.timer} onKeyPress={this.timer}>
                </Card>
                <Results score={this.state.score} errors={this.state.errors} /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
        </div>
      </div>
    )
  }
}
