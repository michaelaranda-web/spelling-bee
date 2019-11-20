import React from 'react';

export const WordInput = (props) => {
  let currentInputLetters = props.currentInput.split('');
  let puzzleLetters = [...props.outerLetters, props.centerLetter];
  
  let inputDisplay = currentInputLetters.map((inputLetter, i) => {
    if (puzzleLetters.indexOf(inputLetter) === -1) {
      return <span className="invalid-letter" key={i}>{inputLetter}</span>
    } else if (props.centerLetter === inputLetter) {
      return <span className="center-letter" key={i}>{inputLetter}</span>
    } else {
      return <span className="input-letter" key={i}>{inputLetter}</span>
    }
  });
  
  return (
    <div className="word-input">
      <div className="word-input-content">
        { inputDisplay }
      </div>
    </div>
  );
}

export default WordInput;