import React from 'react';

export class HiveCell extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pushActive: false
    };
  }
  
  cellFillClass() {
    if (this.state.pushActive) {
      return `cell-fill ${this.props.cellType} push-active`;
    } else {
      return `cell-fill ${this.props.cellType}`;
    }
  }
  
  onMouseDown() {
    this.setState({
      pushActive: true
    });
    
    this.props.onClick(this.props.letter);
  }
  
  onMouseUp() {
    this.setState({
      pushActive: false
    });
  }
  
  render() {
    return (
      <svg 
        className={`hive-cell ${this.props.cellType}`} 
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
        viewBox="0 0 120 103.92304845413263">
        <polygon 
          className={this.cellFillClass()} 
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263" 
          stroke="white" 
          strokeWidth="7.5">
        </polygon>
        <text
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          className="cell-letter" x="50%" y="50%" dy="10.75%">{this.props.letter}</text>
      </svg>
    );
  }
}

