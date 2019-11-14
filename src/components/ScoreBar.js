import React from 'react';

export class ScoreBar extends React.Component {
  constructor(props)  {
    super(props);
    
    this.state = {
      pointsUpdate: 0,
      showPointsUpdate: false,
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.currentScore < this.props.currentScore) {
      const pointsUpdate = this.props.currentScore - prevProps.currentScore;
      
      this.setState({
        pointsUpdate: pointsUpdate,
        showPointsUpdate: true
      });
      
      setTimeout(() => {this.setState({showPointsUpdate: false})}, 1500);
    }
  }
  
  renderPointsUpdate() {
    if (this.state.showPointsUpdate) {
      return (
        <div className="points-update">
          <div className="points-value">{this.state.pointsUpdate}</div>
        </div>  
      );
    }
  }
  
  render() {
    return (
      <div id="score-bar">
        <div className="score-row">
          <span className="score-icon current-score-icon"></span><span className="score-value">{this.props.currentScore}</span>
          {this.renderPointsUpdate()}
        </div>
        <div className="score-row">
          <span className="score-icon genius-score-icon"></span>
          <span className="score-value">{this.props.geniusScore}</span>
        </div>
      </div>
    );
  }
}

export default ScoreBar;