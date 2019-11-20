import React from 'react';
import { parsePuzzleData } from '../helpers/puzzleDataParser';
import moment from 'moment';

export class PuzzleFetcher extends React.Component {
  constructor(props) {
    super(props);
    
    const currentDay = moment().format('DD');
    const currentMonth = moment().format('MM');
    const currentYear = moment().format('YYYY');
    
    this.state = {
      day: currentDay,
      month: currentMonth,
      year: currentYear,
      showDateError: false,
      fetching: false
    }
  }
  
  componentDidMount() {
    this.fetchPuzzle();
  }
  
  handleDayChange(event) {
    this.setState({day: event.target.value, showDateError: false})
  }
  
  handleMonthChange(event) {
    this.setState({month: event.target.value, showDateError: false})
  }
  
  handleYearChange(event) {
    this.setState({year: event.target.value, showDateError: false})
  }
  
  onSubmit() {
    this.fetchPuzzle();
  }
  
  fetchPuzzle() {
    this.setState({fetching: true});
    
    this.props.onPuzzleDataFetch();
    
    const date = this.state.year + "" + this.state.month + "" + this.state.day;
    
    fetch(`https://cors-anywhere.herokuapp.com/https://nytbee.com/Bee_${date}.html` )
      .then((response) => {
        if (response.status === 404) {
          this.setState({showDateError: true, fetching: false});
        } else {
          response.text().then((htmlString) => {
            const puzzleData = parsePuzzleData(htmlString)
            
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
        <span className="day-picker-label">Day/Month/Year:</span>
      
        <select value={this.state.day} onChange={this.handleDayChange.bind(this)}>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>
        <select value={this.state.month} onChange={this.handleMonthChange.bind(this)}>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <select value={this.state.year} onChange={this.handleYearChange.bind(this)}>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
        </select>
        
        <button 
          className="standard-button day-picker-submit-button" 
          onClick={this.onSubmit.bind(this)}
        >
          Submit
        </button>
        
        {
          this.state.fetching ? <p className="fetching-message">Fetching puzzle data. Please hold.</p> : null
        }
        
        {
          this.state.showDateError ? <p className="date-error">Bad date. Please try again.</p> : null
        }
      </div>
    );
  }
}

export default PuzzleFetcher;
