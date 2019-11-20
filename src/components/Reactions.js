import React from 'react';

export class Reactions extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      alreadyReachedGenius: false,
      reactionUpdates: []
    }
  }
  
  setNewReaction(reaction) {
    this.setState({
      reactionUpdates: [...this.state.reactionUpdates, reaction],
    });
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.lastValidWord !== this.props.lastValidWord && this.props.lastValidWord) {
      this.onNewWordEntered();
    }
  }
  
  onNewWordEntered() {
    if (this.props.score >= this.props.pointsNeededForGenius && !this.state.alreadyReachedGenius) {
      this.setNewReaction('genius');
      this.setState({ alreadyReachedGenius: true });
    } else if (this.props.lastValidWord.length === 6) {
      this.setNewReaction('noice');
    } else if (this.props.lastValidWord.length > 6) {
      this.setNewReaction('long_word');
    }
  }
  
  renderReaction(reaction, i) {
    if (reaction === 'genius') {
      return (
        <div className='reaction' key={i}>
          <div className="reaction-text">You're a genius like me!</div>
          <div className="reaction-face-mo"></div>
        </div>
      );
    } else if (reaction === 'long_word') {
      return (
        <div className='reaction' key={i}>
          <div className="reaction-text">Wow!</div>
          <div className="reaction-face-akshay"></div>  
        </div>
      );
    } else if (reaction === 'noice') {
      return (
        <div className='reaction' key={i}>
          <div className="reaction-text">NOICE!</div>
          <div className="reaction-face-michael"></div>  
        </div>
      );
    }
  }
  
  render() {
    return (
      <div id="reaction-section">
        { 
          this.state.reactionUpdates.map((reaction, i) => {
            return this.renderReaction(reaction, i);
          }) 
        }
      </div>
    );
  }
}

export default Reactions;