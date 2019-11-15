import React from 'react';

export const FoundWords = (props) => {
  return (
    <div id="found-words-section">
      <ul id="found-words-list-box">
        {
          props.foundWords.sort().map((foundWord, i) => {
            return <li key={i} className="found-words-list-item">{foundWord}</li>
          })
        }
      </ul>
    </div>
  )
};

export default FoundWords;