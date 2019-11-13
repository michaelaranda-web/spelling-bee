import React from 'react';
import './App.css';
import { parsePuzzleData } from './helpers/puzzleDataParser';

const testURL = 'https://nytbee.com/Bee_20180903.html';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.fetchPuzzleData = this.fetchPuzzleData.bind(this);
    
    this.state = {
      validWords: [],
      centerLetter: '',
      outerLetters: [],
    }
  }
  
  async fetchPuzzleData() {
    fetch('https://cors-anywhere.herokuapp.com/' + testURL)
      .then((response) => {
        response.text().then((htmlString) => {
          const puzzleData = parsePuzzleData(htmlString)
          
          this.setState({
            validWords: puzzleData.validWords,
            centerLetter: puzzleData.centerLetter,
            outerLetters: puzzleData.outerLetters
          });
        })
      });
  }
  
  render() {
    return (
      <div className="App">
        <h1>Superior Spelling Bee App</h1>
        <button onClick={this.fetchPuzzleData}>Fetch</button>
        
        <p><b>{this.state.centerLetter}</b></p>
        <ul>
          {
            this.state.outerLetters.map((letter, i) => {
              return <li key={i}>{letter}</li>
            })
          }
        </ul>
        
      </div>
    );
  }
}

export default App;
