import React from 'react';
import moment from 'moment';

export class PuzzleDatePicker extends React.Component {
  constructor(props) {
    super(props);
    
    const currentDay = moment().format('DD');
    const currentMonth = moment().format('MM');
    const currentYear = moment().format('YYYY');
    
    this.state = {
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    }
  }
  
  handleDayChange(event) {
    this.setState({day: event.target.value}, () => this.props.onDatePickerChange());
  }
  
  handleMonthChange(event) {
    this.setState({month: event.target.value}, () => this.props.onDatePickerChange());
  }
  
  handleYearChange(event) {
    this.setState({year: event.target.value}, () => this.props.onDatePickerChange());
  }
  
  onSubmit() {
    const date = this.state.year + "" + this.state.month + "" + this.state.day;
    this.props.onDatePickerSubmit(date)
  }
  
  render() {
    return (
      <div id="puzzle-date-picker">
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
      </div>
    );  
  }
}

export default PuzzleDatePicker;