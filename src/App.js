import React from 'react';
import './App.css';
import { HiveCell } from './components/HiveCell';
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
    
    this.fetchPuzzleData();
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
        
        <div id="">
          <input 
            autoFocus
          />
        </div>
        
        <br />
        
        <div class="sb-hive">
          <div class="hive">
            <HiveCell letter={this.state.centerLetter} cellType={'center'} />
            
            {
              this.state.outerLetters.map((letter, i) => {
                return <HiveCell key={i} letter={letter} cellType={'outer'} />
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
