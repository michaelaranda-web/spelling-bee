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
          <span className="score-value-label">Score: </span><span className="score-value current-score">{this.props.currentScore}</span>
          <div className="points-update-section">
            {
              this.state.pointsUpdates
            }
          </div>
        </div>
        <div className="score-row" title="Points Needed for Genius">
          <span className="score-icon genius-score-icon"></span>
          <span className="score-value">{this.props.geniusScore}</span>
        </div>
        <div className="score-row" title="Maximum Puzzle Score">
          <span className="score-icon maximum-score-icon"></span>
          <span className="score-value">{this.props.maximumPuzzleScore}</span>
        </div>
        <div className="score-row" title="Number of Valid Words">
          <span className="score-icon number-words-icon"></span>
          <span className="score-value">{this.props.numValidWords}</span>
        </div>
        <div className="score-row" title="Number of Pangrams">
          <span className="score-icon number-pangrams-icon"></span>
          <span className="score-value">{this.props.numberOfPangrams}</span>
        </div>
      </div>
    );
  }
}

export default ScoreBar;