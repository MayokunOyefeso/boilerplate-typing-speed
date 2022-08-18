// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Card from './components/Card';
import randomWords from 'random-words';
import Results from './components/Results';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      words: this.getWords(),
      currentIndex: 0,
      currentUserInput: '',
      score: 0,
    };
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

  updateWords = () => {
    this.setState({
      words: this.getWords
    })
  }

  nextWord = () => {
    if (this.state.currentIndex <= 15) {
      this.setState(
        {
          currentIndex: this.state.currentIndex + 1
        }
      )
    } else {
      this.updateWords();
      this.setState(
        {
          currentIndex: 0
        }
      )
    }
  }
  handleUserInput = (event) => {
    const userInput = event.target.value.trim();
    console.log(userInput);
    let wordsFromState = this.state.words;
    let expectedWord = wordsFromState[this.state.currentIndex];

    console.log(userInput);
    console.log(expectedWord.word);
    if (userInput.length === expectedWord.word.length) {
      expectedWord.status = 0;
      console.log(expectedWord.status);
      if (userInput === expectedWord.word) {
        expectedWord.status = 1;
        wordsFromState[this.state.currentIndex] = expectedWord;
        this.setState({
          score: this.state.scor + 1,
          words: wordsFromState
        });
        console.log(this.state);
        this.nextWord();
      }
      event.target.value = '';
    }
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mt-4">
                <Card words={this.state.words} inputHandler={this.handleUserInput} timer="1:00">
                </Card>
                <Results score={0} />
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

class Word {
  constructor(word, status) {
    this.word = word;
    this.status = status;
  }
}
