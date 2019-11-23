import React from 'react';
import PuzzleDatePicker from './PuzzleDatePicker';

export class PuzzleOptions extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      optionSelected: 'latest',
    }
  }
  
  onOptionClick(option) {
    this.setState({optionSelected: option});
  }
  
  optionClass(option) {
    return this.state.optionSelected === option ? 'selected' : '';
  }
  
  renderDatePicker() {
    if (this.state.optionSelected === 'select') {
      return (
        <PuzzleDatePicker 
          onDatePickerChange={this.props.onDatePickerChange} 
          onDatePickerSubmit={this.props.onDatePickerSubmit}
        />
      );
    }
  }
  
  render() {
    return (
      <div className="puzzle-options-section">
        <div id="puzzle-options">
          <div className={`puzzle-option puzzle-option-latest ${this.optionClass('latest')}`} onClick={() => this.onOptionClick('latest')}>
            Latest
          </div>
          <div className={`puzzle-option puzzle-option-random ${this.optionClass('random')}`} onClick={() => this.onOptionClick('random')}>
            Random
          </div>
          <div className={`puzzle-option puzzle-option-select ${this.optionClass('select')}`} onClick={() => this.onOptionClick('select')}>
            Select
          </div>
        </div>
        <div className="date-picker-section">
          { this.renderDatePicker() }
        </div>
      </div>
    );  
  }
}

export default PuzzleOptions;