// import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import randomWords from 'random-words';
import Results from './components/Results';
function App() {
  const getWords = () => {
    let words = [];
    randomWords(15).map((word)=> {
      words.push(new Word(word,-2));
    });
    return words;
  }
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="mt-4">
              <Card words={getWords()} timer="1:00">
              </Card>
              <Results score={0}/>
            </div>            
          </div>
        </div>
      </div>
      <div className="wrapper">
      </div>
    </div>
  );
}

class Word {
  constructor(word,status) {
    this.word = word;
    this.status = status;
  }
}

export default App;
