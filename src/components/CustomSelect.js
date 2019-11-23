import React from 'react';

export class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selected: props.initialValue,
      showOptions: false,
    }
  }
  
  handleSelect(selectedValue) {
    this.setState({selected: selectedValue, showOptions: false}, () => this.props.onSelect(selectedValue));
  }
  
  renderSelected() {
    return (
      <div 
        className="select-selected"
        onClick={() => this.setState({showOptions: !this.state.showOptions})}>
        {this.state.selected}
      </div>
    );
  }
  
  renderOptions() {
    if (this.state.showOptions) {
      return (
        <div className="select-items">
          {
            this.props.options.map((option, i) => {
              const optionClass = option === this.state.selected ? 'same-as-selected' : '';
              
              return (
                <div 
                  className={optionClass} 
                  key={i} 
                  value={`${option}`}
                  onClick={() => this.handleSelect(option)}
                >
                  {option}
                </div>
              );
            })
          }
        </div>
      );
    }
  }
  
  render() {
    return (
      <div className="custom-select">
        {this.renderSelected()}
        {this.renderOptions()}
        <select value={this.state.selected} onChange={this.handleSelect.bind(this)}>
          {
            this.props.options.map((option, i) => {
              return <option key={i} value={`${option}`}>{option}</option>
            })
          }
        </select>
      </div>
    );  
  }
}

export default CustomSelect;