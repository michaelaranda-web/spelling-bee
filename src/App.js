import React from 'react';
import logo from './logo.svg';

import './App.css';

import cheerio from 'cheerio';

const testURL = 'https://nytbee.com/Bee_20180815.html';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.fetchPuzzleData = this.fetchPuzzleData.bind(this);
    
    this.state = {
      validWords: []
    }
  }
  
  async fetchPuzzleData() {
    fetch('https://cors-anywhere.herokuapp.com/' + testURL)
      .then((response) => {
        response.text().then((htmlString) => {
          console.log(htmlString);
          
          let wordsListString = htmlString.match(/\"words\"\:\[\[(.*?)\]\]/)[0];
          let validWords = wordsListString.match(/\w+/g).slice(1);
          
          this.setState({validWords: validWords});
        })
      });
  }
  
  render() {
    return (
      <div className="App">
        <h1>Superior Spelling Bee App</h1>
        <button onClick={this.fetchPuzzleData}>Fetch</button>
        
        <h2>Answers</h2>
        <ul>
          {
            this.state.validWords.map(word => {
              return <li>{word}</li>
            })
          }
        </ul>
        
      </div>
    );
  }
}

export default App;
