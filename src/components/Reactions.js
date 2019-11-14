import React from 'react';

export class Reactions extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      alreadyReachedGenius: false,
      currentReaction: null,
      timeout: null,
    }
  }
  
  setNewReaction(reaction) {
    clearTimeout(this.state.timeout);
    
    let timeout = setTimeout(() => { 
      this.setState({ currentReaction: null });
    }, 8000)
    
    this.setState({
      currentReaction: reaction,
      timeout: timeout,
    });
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.lastValidWord !== this.props.lastValidWord && this.props.lastValidWord) {
      this.onNewWordEntered();
    }
  }
  
  onNewWordEntered() {
    if (this.props.lastValidWord.length === 6) {
      this.setNewReaction('noice');
    } else if (this.props.lastValidWord.length > 6) {
      this.setNewReaction('long_word');
    } else if (this.props.score > this.props.pointsNeededForGenius) {
      this.setNewReaction('genius');
    }
  }
  
  getReactionClass(reactionType) {
    return reactionType === this.state.currentReaction
      ? 'show-reaction'
      : '';
  }
  
  render() {
    return (
      <div id="reaction-section">
        <div className={`reaction ${this.getReactionClass("genius")}`}>
          <div className="reaction-text">You're a genius like me!</div>
          <div className="reaction-face-mo"></div>
        </div>
        <div className={`reaction ${this.getReactionClass("long_word")}`}>
          <div className="reaction-text">Wow!</div>
          <div className="reaction-face-akshay"></div>  
        </div>
        <div className={`reaction ${this.getReactionClass("noice")}`}>
          <div className="reaction-text">NOICE!</div>
          <div className="reaction-face-michael"></div>  
        </div>
      </div>
    );
  }
}

export default Reactions;