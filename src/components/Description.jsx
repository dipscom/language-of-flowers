import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

export default class Description extends Component {

  animateIn(callback, delay) {
    TweenMax.from(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      x:"+=100",
      delay: delay || 0,
      onComplete:callback
    });
  }

  animateOut(callback) {
    TweenMax.to(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      x:"+=100",
      ease: Power2.easeIn, // eslint-disable-line
      onComplete:callback
    });
  }

  componentWillEnter(callback) {
    console.log("description Will enter", this.el);
    this.animateIn(callback, 1);
  }

  componentWillAppear(callback) {
    console.log("description Will appear", this.el);
  }

  componentDidAppear() {
    console.log("description Did appear");
  }

  componentWillLeave(callback) {
    console.log("description Will leave");
    this.animateOut(callback);
  }

  componentDidMount() {
    console.log("description Did mount");
  }



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
}
