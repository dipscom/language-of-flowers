import React, { Component } from 'react';
import { Link } from 'react-router';
export default class Introduction extends Component {
  componentDidMount() {
    TweenMax.from("#introduction", 1, {autoAlpha:0, x:"+=100"});// eslint-disable-line
  }

  // componentWillUnmount() {
  //   TweenMax.to("#introduction", 1, {autoAlpha:0, x:"+=100"});// eslint-disable-line
  //
  // }

  render() {
    return (
      <div id="introduction" className="stage">
          <img src="" alt="Penhaligon's - est. London 1870 - Portraits" title="Penhaligon's - est. London 1870 - Portraits" />
          <h1>Some things are unutterable and secret. Other thoughts are so hard to say...</h1>
          <p>Thank Heavens for the coded art of flowers...</p>
          <p><strong>Penhaligon's invites you to send your very own coded bouquet.</strong></p>
          <button onClick={this.props.nextStage}>Lets Begin</button>
      </div>
    )
  }
}
