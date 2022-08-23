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
  
  gameStatus = false;
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

  getWords = () => {
    let words = [];
    randomWords(15).map((word) => {
      return words.push(new Word(word, -2));
    });
    if (words.length)
      words[0].status = -1;
    return words;
  }

  nextWord = () => {
    let words = this.state.words;
    let currentIndex = 0;
    if (this.state.currentIndex === 14)
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
