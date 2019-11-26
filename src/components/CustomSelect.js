import React from 'react';

export class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
    
    this.state = {
      selected: props.initialValue,
      showOptions: false,
    }
  }
  
  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }
  
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }
  
  handleClick(event) {
    if (event.target.className === 'select-selected') {
      return;
    }
    
    this.setState({showOptions: false});
  }
  
  handleNativeSelect(event) {
    const selectedValue = event.target.value;
    this.setState({selected: selectedValue, showOptions: false}, () => this.props.onSelect(selectedValue));
  }
  
  handleCustomSelect(selectedValue) {
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
                  key={`custom-option-${this.props.options.length + i}`} 
                  //adding options length to the key id helps with uniqueness across multiple instances of CustomSelect
                  value={`${option}`}
                  onClick={() => this.handleCustomSelect(option)}
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
  
  renderNativeSelect() {
    return (
      <select value={this.state.selected} onChange={this.handleNativeSelect.bind(this)}>
        {
          this.props.options.map((option, i) => {
            return (
              <option 
                key={`native-option-${this.props.options.length + i}`} 
                //adding options length to the key id helps with uniqueness across multiple instances of CustomSelect
                value={`${option}`}>
                {option}
              </option>
            )
          })
        }
      </select>  
    );
  }
  
  render() {
    return (
      <div className="custom-select">
        {this.renderSelected()}
        {this.renderOptions()}
        {this.renderNativeSelect()}
      </div>
    );  
  }
}

export default CustomSelect;