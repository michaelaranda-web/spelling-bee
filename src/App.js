import React from 'react';
import './App.css';
import { HiveCell } from './components/HiveCell';
import PuzzleFetcher from './components/PuzzleFetcher';
import ScoreBar from './components/ScoreBar';
import Reactions from './components/Reactions';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.inputRef = React.createRef();
    
    this.state = {
      currentInput: "",
      validWords: [],
      foundWords: [],
      centerLetter: '',
      outerLetters: [' ', ' ', ' ', ' ', ' ', ' '],
      score: 0,
      pointsNeededForGenius: 0,
      lastValidWord: null,
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
      score: 0,
      pointsNeededForGenius: 0,
      lastValidWord: null,
    })
  }
  
  submitWord() {
    const word = this.state.currentInput;
    
    const isValidWord = this.state.validWords.indexOf(word) > -1;
    const notYetFound = this.state.foundWords.indexOf(word) === -1;
    
    if (isValidWord && notYetFound) {
      this.updateScore(word);
      
      let newFoundWords = [...this.state.foundWords, word];
      this.setState({foundWords: newFoundWords});
    }
    
    this.setState({currentInput: ""});
  }
  
  //4-letter words = 1 point, 1 extra point per letter past 4, 7 extra points for a pangram
  updateScore(word) {
    let pointsForWord = 1;
    
    if (word.length > 4) {
      pointsForWord = word.length;
    }
    
    if (this.isPangram(word)) { 
      pointsForWord += 7;
    }
    
    this.setState({score: this.state.score + pointsForWord, lastValidWord: word});
  }
  
  isPangram(word) {
    const lettersInWord = word.split('');
    const allPuzzleLetters = [this.state.centerLetter, ...this.state.outerLetters];
    
    for (let puzzleLetter in allPuzzleLetters) {
      if (lettersInWord.indexOf(puzzleLetter) === -1) { return false }
    }
    
    return true;
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
      pointsNeededForGenius: puzzleData.pointsNeededForGenius,
    });
    
    this.inputRef.current.focus();
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
          <ScoreBar 
            currentScore={this.state.score}
            geniusScore={this.state.pointsNeededForGenius}
          />
          
          <Reactions 
            lastValidWord={this.state.lastValidWord} 
            score={this.state.score}
            pointsNeededForGenius={this.state.pointsNeededForGenius}
          />
          
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
        
        <input id="hidden-input-for-refocus" value="" ref={this.inputRef} />
      </div>
    );
  }
}

export default App;
