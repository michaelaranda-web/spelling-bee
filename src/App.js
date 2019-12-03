import React from 'react';
import './App.css';
import { HiveCell } from './components/HiveCell';
import PuzzleFetcher from './components/PuzzleFetcher';
import ScoreBar from './components/ScoreBar';
import Reactions from './components/Reactions';
import FoundWords from './components/FoundWords';
import WordInput from './components/WordInput';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentInput: "",
      validWords: [],
      foundWords: [],
      centerLetter: '',
      outerLetters: [' ', ' ', ' ', ' ', ' ', ' '],
      score: 0,
      pointsNeededForGenius: 0,
      lastValidWord: null,
      numberOfPangrams: 0,
      maximumPuzzleScore: 0,
      theme: '',
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
      numberOfPangrams: 0,
      maximumPuzzleScore: 0,
    })
  }
  
  submitWord() {
    const centerLetter = this.state.centerLetter;
    const word = this.state.currentInput;
    
    // Tron Secret Theme
    if (word === `${centerLetter}${centerLetter}${centerLetter}${centerLetter}${centerLetter}`) {
      document.querySelector('html').classList.add('dark-mode'); 
    } else {
      const isValidWord = this.state.validWords.indexOf(word) > -1;
      const notYetFound = this.state.foundWords.indexOf(word) === -1;
      
      if (isValidWord && notYetFound) {
        this.updateScore(word);
        
        let newFoundWords = [...this.state.foundWords, word];
        this.setState({foundWords: newFoundWords});
      }
    }
    
    this.setState({currentInput: ""});
  }
  
  //4-letter words = 1 point, 1 point per letter if >4 letters, 7 extra points for a pangram
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
    return [...new Set(word.split(''))].length === 7;
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
      numberOfPangrams: puzzleData.numberOfPangrams,
      maximumPuzzleScore: puzzleData.maximumPuzzleScore,
    });
  }
  
  render() {
    return (
      <div className='App'>
        <div className="app-section left-app-section">
          <h1>Superior Spelling Bee App</h1>
          
          <PuzzleFetcher 
            onPuzzleDataFetch={() => { this.resetState() }}
            onPuzzleDataReceive={this.onPuzzleDataReceive.bind(this)}
          />
          
          <WordInput 
            currentInput={this.state.currentInput}
            outerLetters={this.state.outerLetters}
            centerLetter={this.state.centerLetter}
          />
          
          <div className="temporary-hive-container">
            <ScoreBar 
              currentScore={this.state.score}
              geniusScore={this.state.pointsNeededForGenius}
              numValidWords={this.state.validWords.length}
              numberOfPangrams={this.state.numberOfPangrams}
              maximumPuzzleScore={this.state.maximumPuzzleScore}
              
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
                    return <HiveCell key={`outer-hive-cell-${i}`} letter={letter} cellType={'outer'} onClick={this.addLetter.bind(this)} />
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
        </div>
        
        <div className="app-section right-app-section">
          <FoundWords 
            currentInput={this.state.currentInput}
            foundWords={this.state.foundWords} 
          />
        </div>  
        
      </div>
    );
  }
}

export default App;
