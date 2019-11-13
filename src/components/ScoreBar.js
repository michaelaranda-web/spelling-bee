import React from 'react';

export function ScoreBar(props) {
  return (
    <div id="score-bar">
      <div className="score-row">
        <span className="score-icon current-score-icon"></span><span className="score-value">{props.currentScore}</span>
      </div>
      <div className="score-row">
        <span className="score-icon genius-score-icon"></span><span className="score-value">{props.geniusScore}</span>
      </div>
    </div>
  );
}

export default ScoreBar;