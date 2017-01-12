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
      <img src="" alt="The Language of Flowers" title="The Language of Flowers" />
          <h1>Bouquets full of hidden meaning.</h1>
          <p>Whilst we don't like to gossip...</p>
          <strong>Choose the flowers and the recipient wisely</strong>
          <IndexLink to="/">Back</IndexLink>
          <Link className="button" to="/create-bouquet">Create your own bouquet</Link>
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
    console.log("Description Will enter");
    this.animateIn(callback, 1);
  }

  componentDidEnter() {
    console.log("Description Did enter");
  }

  componentWillAppear(callback) {
    console.log("Description Will appear");
  }

  componentDidAppear() {
    console.log("Description Did appear");
  }

  componentWillLeave(callback) {
    console.log("Description Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    console.log("Description Did leave");
  }

}
