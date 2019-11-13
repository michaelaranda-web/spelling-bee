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
      outerLetters: [' ', ' ', ' ', ' ', ' ', ' '],
    }
  }
  
  componentWillMount() {
      document.addEventListener("keydown", this.onKeyPress.bind(this));
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyPress.bind(this));
  } 
  
  resetState() {
    this.setState({
      currentInput: "",
      validWords: [],
      foundWords: [],
      centerLetter: '',
      outerLetters: [' ', ' ', ' ', ' ', ' ', ' '],
    })
  }
  
  submitWord() {
    const isValidWord = this.state.validWords.indexOf(this.state.currentInput) > -1;
    const notYetFound = this.state.foundWords.indexOf(this.state.currentInput) === -1
    
    if (isValidWord && notYetFound) {
      let newFoundWords = [...this.state.foundWords, this.state.currentInput]
      this.setState({
        foundWords: newFoundWords
      })
    }
    
    this.setState({currentInput: ""});
  }
  
  shuffleLetters() {
    let shuffledLetters = [...this.state.outerLetters];
    
    for (let i = shuffledLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledLetters[i], shuffledLetters[j]] = [shuffledLetters[j], shuffledLetters[i]];
    }
    
    this.setState({
      outerLetters: shuffledLetters
    })
  }
  
  addLetter(letter) {
    this.setState({
      currentInput: this.state.currentInput + letter
    });
  }
  
  deleteLetter() {
    this.setState({
      currentInput: this.state.currentInput.slice(0, this.state.currentInput.length - 1) 
    });
  }
  
  onKeyPress(e) {
    if (e.key.search(/^[a-zA-Z]$/) > -1) {
      this.addLetter(e.key);
    } else if (e.key === 'Backspace') {
      this.deleteLetter();
    } else if (e.key === 'Enter') {
      this.submitWord();
    }
  }
  
  onPuzzleDataReceive(puzzleData) {
    this.setState({
      validWords: puzzleData.validWords,
      centerLetter: puzzleData.centerLetter,
      outerLetters: puzzleData.outerLetters,
      foundWords: [],
    });
  }
  
  render() {
    return (
      <div className="App">
        <h1>Superior Spelling Bee App</h1>
        
        <PuzzleFetcher 
          onPuzzleDataFetch={this.resetState.bind(this)}
          onPuzzleDataReceive={this.onPuzzleDataReceive.bind(this)}
        />
        
        <div className="word-input">
          <div className="word-input-content">
            { this.state.currentInput }
          </div>
        </div>
        
        <div className="temporary-hive-container">
          <div className="sb-hive">
            <div className="hive">
              <HiveCell 
                letter={this.state.centerLetter} 
                cellType={'center'} 
                onClick={this.addLetter.bind(this)}
              />
              
              {
                this.state.outerLetters.map((letter, i) => {
                  return <HiveCell key={i} letter={letter} cellType={'outer'} onClick={this.addLetter.bind(this)} />
                })
              }
            </div>
          </div>
        </div>
        
        <div className="hive-actions">
          <div 
            className="hive-action hive-action__delete sb-touch-button"
            onClick={this.deleteLetter.bind(this)}>
            Delete
          </div>
          <div 
            className="hive-action hive-action__shuffle sb-touch-button"
            onClick={this.shuffleLetters.bind(this)}
            ></div>
          <div 
            className="hive-action hive-action__submit sb-touch-button"
            onClick={this.submitWord.bind(this)}>
            Enter
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
