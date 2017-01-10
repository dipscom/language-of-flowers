import React, { Component } from 'react';
import { Link } from 'react-router';
export default class Introduction extends Component {

  componentWillEnter() {
    console.log("Will enter");
  }

  componentWillAppear(callback) {
    console.log("Will appear", this.el);
    TweenMax.from(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      x:"+=100",
      onComplete:callback
    });

  }

  componentDidAppear() {
    console.log("Did appear");
  }

  componentDidMount() {
    console.log("Did mount");
  }


  render() {
    return (
      <div
        id="introduction"
        className="stage"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
          <img src="" alt="Penhaligon's - est. London 1870 - Portraits" title="Penhaligon's - est. London 1870 - Portraits" />
          <h1>Some things are unutterable and secret. Other thoughts are so hard to say...</h1>
          <p>Thank Heavens for the coded art of flowers...</p>
          <p><strong>Penhaligon's invites you to send your very own coded bouquet.</strong></p>
          <button onClick={this.props.nextStage}>Lets Begin</button>
      </div>

    )
  }
}
