import React from 'react';

export class ScoreBar extends React.Component {
  constructor(props)  {
    super(props);
    
    this.state = {
      pointsUpdates: [],
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.currentScore < this.props.currentScore) {
      const pointsScored = this.props.currentScore - prevProps.currentScore;
      
      this.setState({
        pointsUpdates: [...this.state.pointsUpdates, this.renderPointsUpdate(pointsScored, `points-update-${this.state.pointsUpdates.length}`)]
      })
    }
  }
  
  renderPointsUpdate(pointsScored, key) {
    return (
      <div className="points-update" key={key}>
        <div className="points-value">{pointsScored}</div>
      </div>  
    );
  }
  
  render() {
    return (
      <div id="score-bar">
        <div className="score-row">
          <span className="score-icon current-score-icon"></span><span className="score-value">{this.props.currentScore}</span>
          <div className="points-update-section">
            {
              this.state.pointsUpdates
            }
          </div>
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