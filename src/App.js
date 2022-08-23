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
  gameStatus = false;
  NUM_OF_WORDS = 30 ;
  constructor() {
    // why we use super()
    // https://stackoverflow.com/questions/40433463/what-does-calling-super-in-a-react-constructor-do   
    super();
    this.state = {
      words: this.getWords(),
      currentIndex: 0,
      currentUserInput: '',
      score: 0,
      errors: 0,
      timer: '1:00',
    };
  }
  
  /**
   * Starts timer when the game starts and updates time left every second
   */
  timer = () => {
    if (!this.gameStatus)
      this.gameStatus = !this.gameStatus;
    else
      return;
    let secs = 60;
    let mins = 0;
    const timerInterval = setInterval(() => {
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(timerInterval);
          return;
        } else {
          mins = mins - 1;
          secs = 60;
        }
      }
      secs = secs - 1;
      this.setState({
        timer: mins + ":" + secs
      });
      if (secs === 0) {
        alert(`Score:${this.state.score}, Errors:${this.state.errors}`);
        this.setState(
          {
            currentIndex: 0,
            words: this.getWords(),
            timer: '1:00',
            score: 0,
            errors: 0
          });
          this.gameStatus = false;
          document.querySelector('#words-input').value = '';
      }
    }, 1000);
  }

  /**
   * @returns array of @Word objects
   */
  getWords = () => {
    let words = [];
    randomWords(this.NUM_OF_WORDS).map((word) => {
      return words.push(new Word(word, -2));
    });
    if (words.length)
      words[0].status = -1;
    return words;
  }

  /**
   * Moves to next word.
   * Updates words with new words if current index is at the end of array
   */
  nextWord = () => {
    let words = this.state.words;
    let currentIndex = 0;
    if (this.state.currentIndex === this.NUM_OF_WORDS - 1)
      words = this.getWords();
    else {
      currentIndex = this.state.currentIndex + 1;
    }

    if (currentIndex >= 0 && words[currentIndex])
      words[currentIndex].status = -1;
    this.setState(
      {
        currentIndex: currentIndex,
        words: words
      }
    )
  }

  /**
   * Validates current user input and handles score updates.
   * Calls next word when current word is done
   * @param {*} event 
   */
  handleUserInput = (event) => {
    const userInput = event.target.value.trim();
    let wordsFromState = this.state.words;
    let expectedWord = wordsFromState[this.state.currentIndex];
    if (userInput.length === expectedWord.word.length) {
      let score = this.state.score;
      let errors = this.state.errors;
      if (userInput === expectedWord.word) {
        expectedWord.status = 1;
        ++score;
      } else {
        expectedWord.status = 0;
        ++errors;
      }
      wordsFromState[this.state.currentIndex] = expectedWord;
      this.setState({
        score: score,
        errors: errors,
        words: wordsFromState
      });
      this.nextWord();
      event.target.value = '';
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mt-4">
                <Card words={this.state.words} inputHandler={this.handleUserInput} timer={this.state.timer} onKeyPress={this.timer}>
                </Card>
                <Results score={this.state.score} errors={this.state.errors} />
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
