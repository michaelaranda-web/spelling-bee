import React from 'react';
import './App.css';
import { HiveCell } from './components/HiveCell';
import PuzzleFetcher from './components/PuzzleFetcher';
import ScoreBar from './components/ScoreBar';

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
      reachedGeniusAlready: false,
      reaction: null,
      currentReactionTimeout: null,
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
      reachedGeniusAlready: false,
      reaction: null,
      currentReactionTimeout: null,
    })
  }
  
  submitWord() {
    const word = this.state.currentInput;
    
    const isValidWord = this.state.validWords.indexOf(word) > -1;
    const notYetFound = this.state.foundWords.indexOf(word) === -1;
    
    if (isValidWord && notYetFound) {
      this.updateScore(word);
      
      let newFoundWords = [...this.state.foundWords, word]
      this.setState({
        foundWords: newFoundWords
      })
    }
    
    this.setState({currentInput: ""});
  }
  
  //4-letter words = 1 point, 1 extra point per letter past 4, 7 extra points for a pangram
  updateScore(word) {
    let pointsForWord = word.length - 3;
    
    if (word.length === 6) {
      this.triggerReaction('noice');
    }
    
    if (word.length > 6) {
      this.triggerReaction('long_word');
    }
    
    if (this.isPangram(word)) { 
      pointsForWord += 7; 
      this.triggerReaction('pangram');
    }
    
    this.setState({score: this.state.score + pointsForWord}, () => {
      if (this.state.score >= this.state.pointsNeededForGenius && !this.state.reachedGeniusAlready) {
        this.triggerReaction('genius');
        this.setState({
          reachedGeniusAlready: true
        })
      }
    });
  }
  
  triggerReaction(reactionType) {
    if (this.state.currentReactionTimeout) {
      clearTimeout(this.state.currentReactionTimeout);
      this.setState({currentReactionTimeout: null});
    }
    
    this.setState({
      reaction: reactionType
    }) 
    
    let timeout = setTimeout(() => {
      this.setState({reaction: null})
    }, 8000)
    
    this.setState({
      currentReactionTimeout: timeout
    })
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
  }
  
  renderReaction() {
    if (this.state.reaction === 'genius') {
      return (
        <div className="reaction" key={Math.random()}>
          <div className="reaction-text">You're a genius like me!</div>
          <div className="reaction-face-mo"></div>
        </div>
      )
    } else if (this.state.reaction === 'long_word') {
      return (
        <div className="reaction" key={Math.random()}>
          <div className="reaction-text">Wow!</div>
          <div className="reaction-face-akshay"></div>  
        </div>
      )
    } else if (this.state.reaction === 'noice') {
      return (
        <div className="reaction" key={Math.random()}>
          <div className="reaction-text">NOICE!</div>
          <div className="reaction-face-michael"></div>  
        </div>
      )
    }
    
    return null;
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
          
          <div id="reaction-section">
            { this.renderReaction() }
          </div>
          
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
