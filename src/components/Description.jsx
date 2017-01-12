import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

export default class Description extends Component {

  render() {
    return (
      <div
        id="description"
        key="description"
        className="stage"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <div>
          <img src="" alt="The Language of Flowers" title="The Language of Flowers" />
            <h1>
              <hr />
              Bouquets full of hidden&nbsp;meaning.
              <hr />
            </h1>
            <p>Whilst we don't like to gossip it would appear that there was a 'mistake' and the flowers from Lord George, meant for Lady Blanche, well they seem to have been sent to the divine Clara...With Penhaligon’s Floriography, indiscrete messages can be relayed between sweethearts, paramours and sugar peas - but what could be more (ah-em) improbable!</p>
            <strong>Choose the flowers and the recipient wisely</strong>
            <div>
              <Link className="button" to="/create-bouquet">Create your own bouquet</Link>
            </div>
            <IndexLink to="/" id="reset-button" onClick={this.reset}>Start Again</IndexLink>
        </div>
        </div>
    )
  }




  /* Animation */
  animateIn(callback, delay) {
    TweenMax.from(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      delay: delay || 0,
      onComplete:callback
    });
  }

  animateOut(callback) {
    TweenMax.to(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      ease: "Power4.easeIn",
      onComplete:callback
    });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    // console.log("Description Will enter");
    this.animateIn(callback, 1);
  }

  componentDidEnter() {
    // console.log("Description Did enter");
  }

  componentWillAppear(callback) {
    // console.log("Description Will appear");
  }

  componentDidAppear() {
    // console.log("Description Did appear");
  }

  componentWillLeave(callback) {
    // console.log("Description Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    // console.log("Description Did leave");
  }



}
