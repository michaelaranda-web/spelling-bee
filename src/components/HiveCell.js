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
  
  onMouseDown(event) {
    event.preventDefault();
    
    this.setState({
      pushActive: true
    });
    
    this.props.onClick(this.props.letter);
  }
  
  onMouseUp(event) {
    event.preventDefault();
    
    this.setState({
      pushActive: false
    });
  }
  
  render() {
    return (
      <svg 
        className={`hive-cell ${this.props.cellType}`} 
        onMouseDown={(event) => this.onMouseDown(event)}
        onMouseUp={(event) => this.onMouseUp(event)}
        onTouchStart={(event) => this.onMouseDown(event)}
        onTouchEnd={(event) => this.onMouseUp(event)}
        viewBox="0 0 120 103.92304845413263">
        <polygon 
          className={this.cellFillClass()} 
          onMouseDown={(event) => this.onMouseDown(event)}
          onMouseUp={(event) => this.onMouseUp(event)}
          onTouchStart={(event) => this.onMouseDown(event)}
          onTouchEnd={(event) => this.onMouseUp(event)}
          points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263" 
          stroke="white" 
          strokeWidth="7.5">
        </polygon>
        <text
          onMouseDown={(event) => this.onMouseDown(event)}
          onMouseUp={(event) => this.onMouseUp(event)}
          onTouchStart={(event) => this.onMouseDown(event)}
          onTouchEnd={(event) => this.onMouseUp(event)}
          className="cell-letter" x="50%" y="50%" dy="10.75%">{this.props.letter}</text>
      </svg>
    );
  }
}

