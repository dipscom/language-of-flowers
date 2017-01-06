import React, { Component } from 'react';

export default class Introduction extends Component {
  render() {
    return (
      <div id="introduction" className="stage">
          <img src="" alt="Penhaligon's - est. London 1870 - Portraits" title="Penhaligon's - est. London 1870 - Portraits" />
          <h1>Some things are unutterable and secret. Other thoughts are so hard to say...</h1>
          <p>Thank Heavens for the coded art of flowers...</p>
          <strong>Penhaligon's invites you to send your very own coded bouquet.</strong>
          <button onClick={this.props.nextStage}>Lets Begin</button>
      </div>
    )
  }
}