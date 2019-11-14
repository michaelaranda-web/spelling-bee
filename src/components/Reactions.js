import React from 'react';

export class Reactions extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      alreadyReachedGenius: false,
      currentReaction: null,
      timeout: null,
      resetTransitionKey: null
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
      resetTransitionKey: Math.random(),
    });
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.lastValidWord !== this.props.lastValidWord) {
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
  
  renderReaction() {
    if (this.state.currentReaction === "genius") {
      return (
        <div className="reaction" key={this.state.resetTransitionKey}>
          <div className="reaction-text">You're a genius like me!</div>
          <div className="reaction-face-mo"></div>
        </div>
      )
    } else if (this.state.currentReaction === 'long_word') {
      return (
        <div className="reaction" key={this.state.resetTransitionKey}>
          <div className="reaction-text">Wow!</div>
          <div className="reaction-face-akshay"></div>  
        </div>
      )
    } else if (this.state.currentReaction === 'noice') {
      return (
        <div className="reaction" key={this.state.resetTransitionKey}>
          <div className="reaction-text">NOICE!</div>
          <div className="reaction-face-michael"></div>  
        </div>
      )
    }
    
    return null;
  }
  
  render() {
    return (
      <div id="reaction-section">
        {this.renderReaction()}
      </div>
    );
  }
}

export default Reactions;