import React from 'react';

export class Reactions extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      alreadyReachedGenius: false,
      reactions: []
    }
  }
  
  addNewReaction(reaction) {
    this.setState({
      reactions: [...this.state.reactions, this.getReaction(reaction, `reaction-${this.state.reactions.length}`)],
    });
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.lastValidWord !== this.props.lastValidWord && this.props.lastValidWord) {
      this.onNewWordEntered();
    }
  }
  
  onNewWordEntered() {
    if (this.props.score >= this.props.pointsNeededForGenius && !this.state.alreadyReachedGenius) {
      this.addNewReaction('genius');
      this.setState({ alreadyReachedGenius: true });
    } else if (this.props.lastValidWord.length === 6) {
      this.addNewReaction('noice');
    } else if (this.isPangram(this.props.lastValidWord)) {
      this.addNewReaction('pangram');
    } else if (this.props.lastValidWord.length > 6) {
      this.addNewReaction('long_word');
    }
  }
  
  isPangram(word) {
    return [...new Set(word.split(''))].length === 7;
  }
  
  getReaction(reaction, key) {
    if (reaction === 'genius') {
      return (
        <div className='reaction reaction-mo' key={key}>
          <div className="reaction-text">You're&nbsp;a&nbsp;genius,</div>
          <div className="reaction-text">just&nbsp;like&nbsp;me!</div>
          <div className="reaction-face-mo"></div>
        </div>
      );
    } else if (reaction === 'long_word') {
      return (
        <div className='reaction' key={key}>
          <div className="reaction-text">Wow!</div>
          <div className="reaction-face-akshay"></div>  
        </div>
      );
    } else if (reaction === 'noice') {
      return (
        <div className='reaction' key={key}>
          <div className="reaction-text">NOICE!</div>
          <div className="reaction-face-michael"></div>  
        </div>
      );
    } else if (reaction === 'pangram') {
      return (
        <div className='reaction' key={key}>
          <div className="reaction-text">Oh&nbsp;man!</div>
          <div className="reaction-text">A&nbsp;pangram!</div>
          <div className="reaction-face-david"></div>  
        </div>
      );
    }
  }
  
  render() {
    return (
      <div id="reaction-section">
        { 
          this.state.reactions
        }
      </div>
    );
  }
}

export default Reactions;