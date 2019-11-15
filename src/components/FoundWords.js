import React from 'react';

export const FoundWords = (props) => {
  return (
    <div id="found-words-section">
      <ul id="found-words-list-box">
        {
          props.foundWords.sort().map((foundWord, i) => {
            if (props.currentInput !== "") {
              if (foundWord.startsWith(props.currentInput)) {
                return <li key={i} className="found-words-list-item">{foundWord}</li>
              } else {
                return <li key={i} className="found-words-list-item grey-out">{foundWord}</li>
              }
            }
            
            return <li key={i} className="found-words-list-item">{foundWord}</li>
          })
        }
      </ul>
    </div>
  )
};

export default FoundWords;