import React from 'react';

const openInNewTab = (url) => {
  var win = window.open(url, '_blank');
  win.focus();
}

const FoundWordItem = (props) => {
  const googleDefineLink = `https://www.google.com/search?q=define+${props.value}&oq=define+${props.value}`
  const onItemClick = () => {
    if (props.value) {
      openInNewTab(googleDefineLink)
    }
  }
  
  return (
    <li 
      className={props.componentClass} 
      onClick={() => onItemClick()}
      title={props.value ? `Click for Google definition of ${props.value}` : "Word not yet found"}
    >
      {props.value}
    </li>
  );
};

const WordDisplayItems = (props) => {
  if (props.showWordPositions) {
    return props.validWords.sort().map((validWord) => {
      const value = props.foundWords.includes(validWord) ? validWord : ""
    
      return <FoundWordItem key={validWord} componentClass="found-words-list-item" value={value} />
    })
  } else {
    return props.foundWords.sort().map((foundWord) => {
      return <FoundWordItem key={foundWord} componentClass="found-words-list-item" value={foundWord} />
    })
  }
}

export const FoundWords = (props) => {
  return (
    <div id="found-words-section">
      <div id="puzzle-date">{props.puzzleDate}</div>
      <div id="found-words-counter">
        <span className="found-words-count">{props.foundWords.length}</span>
        <span className="found-words-counter-slash">out of</span>
        <span className="total-words-count">{props.validWords.length}</span>
      </div>
      <ul id="found-words-list-box">
        { WordDisplayItems(props) }
      </ul>
    </div>
  )
};

export default FoundWords;