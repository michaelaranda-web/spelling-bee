import React from 'react';
import moment from 'moment';
import CustomSelect from './CustomSelect';

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
  
  handleDayChange(day) {
    this.setState({day}, () => this.props.onDatePickerChange());
  }
  
  handleMonthChange(month) {
    this.setState({month}, () => this.props.onDatePickerChange());
  }
  
  handleYearChange(year) {
    this.setState({year}, () => this.props.onDatePickerChange());
  }
  
  onSubmit() {
    const date = this.state.year + "" + this.state.month + "" + this.state.day;
    this.props.onDatePickerSubmit(date)
  }
  
  render() {
    return (
      <div id="puzzle-date-picker">
        <div className="date-picker-container">
          <CustomSelect 
            initialValue={this.state.day}
            onSelect={(day) => { this.handleDayChange(day) }}
            options={["01", "02", "03", "04", "05", "06", "07", "08", "09", 
                      "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", 
                      "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]}
          />
          <div className="date-picker-container-label">Day</div>
        </div>
        
        <div className="date-picker-container">
          <CustomSelect 
            initialValue={this.state.month}
            onSelect={(month) => { this.handleMonthChange(month) }}
            options={["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]}
          />
          <div className="date-picker-container-label">Month</div>
        </div>
        
        <div className="date-picker-container">
          <CustomSelect 
            initialValue={this.state.year}
            onSelect={(year) => { this.handleYearChange(year) }}
            options={["2018", "2019"]}
          />
          <div className="date-picker-container-label">Year</div>
        </div>
        
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