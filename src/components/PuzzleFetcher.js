import React from 'react';
import moment from 'moment';
import PuzzleDatePicker from './PuzzleDatePicker'

export class PuzzleFetcher extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showDateError: false,
      showServerError: false,
      fetching: false
    }
  }
  
  componentDidMount() {
    const currentDay = moment().format('YYYYMMDD');
    this.fetchPuzzle(currentDay);
  }
  
  fetchPuzzle(date) {
    this.setState({fetching: true});
    
    this.props.onPuzzleDataFetch();
    
    fetch(`https://cors-anywhere.herokuapp.com/http://ec2-34-219-176-146.us-west-2.compute.amazonaws.com:8080/puzzles/${date}` )
      .then((response) => {
        if (response.status === 404) {
          this.setState({showDateError: true, fetching: false});
        } else if (response.status >= 500) { 
          this.setState({showServerError: true, fetching: false});
        } else {
          response.json().then((puzzleData) => {
            this.props.onPuzzleDataReceive(puzzleData);
            this.setState({fetching: false});
          })
        }
      })
      .catch((error) => {
        this.setState({showDateError: true, fetching: false});
      });
  }
  
  render() {
    return (
      <div id="puzzle-fetcher">
        <PuzzleDatePicker 
          onDateSelectChange={() => this.setState({showDateError: false, showServerError: false})} 
          onSubmit={(date) => this.fetchPuzzle(date)}
        />
        
        {
          this.state.fetching ? <p className="fetching-message">Fetching puzzle data. Please hold.</p> : null
        }
        
        {
          this.state.showDateError ? <p className="date-error">Bad date. Please try again.</p> : null
        }
        
        {
          this.state.showServerError ? <p className="date-error">Server error. Please try again.</p> : null
        }
      </div>
    );
  }
}

export default PuzzleFetcher;
