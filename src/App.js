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
    console.log(this.state);
    console.log('Update new words');
    
    this.setState({
      words: this.getWords(),
      currentIndex: 0
    });
    console.log(this.state);
  }

  nextWord = () => {
    if (this.state.currentIndex === 14) {
      this.updateWords();
      console.log(this.state);
    }
    let words = this.state.words;
    let currentIndex = this.state.currentIndex + 1;

    if(this.state.currentIndex !== 14 && words[this.state.currentIndex])
      words[currentIndex].status = -1;
    this.setState(
      {
        currentIndex: currentIndex,
        words: words
      }
    )
    console.log('after next word:',this.state);
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
      }
      this.nextWord();
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
// -2 
// -1 current word
// 0 wrong word
// 1 correct word

class Word {
  constructor(word, status) {
    this.word = word;
    this.status = status;
  }
}
