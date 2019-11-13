import React from 'react';
import './App.css';
import { HiveCell } from './components/HiveCell';
import PuzzleFetcher from './components/PuzzleFetcher';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentInput: "",
      validWords: [],
      foundWords: [],
      centerLetter: '',
      outerLetters: [],
    }
  }
  
  componentWillMount() {
      document.addEventListener("keydown", this.onKeyPress.bind(this));
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyPress.bind(this));
  } 
  
  submitWord() {
    if (this.state.validWords.indexOf(this.state.currentInput) > -1) {
      let newFoundWords = [...this.state.foundWords, this.state.currentInput]
      this.setState({
        foundWords: newFoundWords
      })
    }
  }
  
  onKeyPress(e) {
    if (e.key.search(/^[a-zA-Z]$/) > -1) {
      this.setState({
        currentInput: this.state.currentInput + e.key
      });
    } else if (e.key === 'Backspace') {
      this.setState({
        currentInput: this.state.currentInput.slice(0, this.state.currentInput.length - 1) 
      });
    } else if (e.key === 'Enter') {
      this.submitWord();
      this.setState({
        currentInput: ""
      })
    }
  }
  
  onPuzzleDataReceive(puzzleData) {
    this.setState({
      validWords: puzzleData.validWords,
      centerLetter: puzzleData.centerLetter,
      outerLetters: puzzleData.outerLetters
    });
  }
  
  render() {
    return (
      <div className="App">
        <h1>Superior Spelling Bee App</h1>
        
        <PuzzleFetcher 
          onPuzzleFetch={this.onPuzzleDataReceive.bind(this)}
        />
        
        <div id="">
          <div className="sb-hive-input">
            <input 
              className="sb-hive-input-content"
              value={this.state.currentInput}
            />
          </div>
        </div>
        
        <br />
        
        <div className="temporary-hive-container">
          <div className="sb-hive">
            <div className="hive">
              <HiveCell letter={this.state.centerLetter} cellType={'center'} />
              
              {
                this.state.outerLetters.map((letter, i) => {
                  return <HiveCell key={i} letter={letter} cellType={'outer'} />
                })
              }
            </div>
          </div>
        </div>
        
        <div id="found-words-section">
          {
            this.state.foundWords.map((foundWord, i) => {
              return <p key={i}>{foundWord}</p>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
