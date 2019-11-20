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
      const pointsUpdate = this.props.currentScore - prevProps.currentScore;
      
      this.setState({
        pointsUpdates: [...this.state.pointsUpdates, pointsUpdate]
      })
    }
  }
  
  renderPointsUpdate(pointsScored, index) {
      return (
        <div className="points-update" key={index}>
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
              this.state.pointsUpdates.map((pointsScored, i) => {
                return this.renderPointsUpdate(pointsScored, i)
              })
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