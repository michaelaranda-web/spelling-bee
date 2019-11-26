import React from 'react';

const FoundWordItem = (props) => {
  return <li className={props.componentClass}>{props.word}</li>;
};

export const FoundWords = (props) => {
  return (
    <div id="found-words-section">
      <ul id="found-words-list-box">
        {
          props.foundWords.sort().map((foundWord) => {
            if (props.currentInput !== "") {
              if (foundWord.startsWith(props.currentInput)) {
                return <FoundWordItem key={foundWord} componentClass="found-words-list-item" word={foundWord} />
              } else {
                return <FoundWordItem key={foundWord} componentClass="found-words-list-item grey-out" word={foundWord} />
              }
            }
            
            return <FoundWordItem key={foundWord} componentClass="found-words-list-item" word={foundWord} />
          })
        }
      </ul>
    </div>
  )
};

export default FoundWords;