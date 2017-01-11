import React, { Component } from 'react';
import { Link } from 'react-router';
export default class Introduction extends Component {

  constructor() {
    super();

    this.tl;
  }

  animateIn(callback, delay) {
    return TweenMax.from(this.el, 1, { // eslint-disable-line
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
      ease: "Power4.easeIn",
      onComplete:callback
    });
  }


  componentWillEnter(callback) {
    console.log("introduction Will enter");
    this.animateIn(callback, 1);
  }

  componentWillAppear(callback) {
    console.log("introduction Will appear");
    this.animateIn(callback);
  }

  componentDidAppear(callback) {
    console.log("introduction Did appear");
  }

  componentWillLeave(callback) {
    console.log("introduction Will leave");
    this.animateOut(callback);
  }

  componentDidLeave(callback) {
    console.log("introduction Did leave");
  }

  componentDidMount() {
    console.log("introduction Did mount");
  }

  componentWillUnmount() {
    console.log("introduction Will unmount");
  }

  render() {
    return (
      <div
        id="introduction"
        key="introduction"
        className="stage"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
          <img src="" alt="Penhaligon's - est. London 1870 - Portraits" title="Penhaligon's - est. London 1870 - Portraits" />
          <h1>Some things are unutterable and secret. Other thoughts are so hard to say...</h1>
          <p>Thank Heavens for the coded art of flowers. A mysterious language - of love? Cryptic communications, secret assignations, hidden revelations, coded declarations! Floriography. Oh! what a gift! Quel cadeau.</p>
          <strong>Penhaligon&#39;s invites you to send your very own coded bouquet.</strong>
          <Link className="button" to="/description">Lets Begin</Link>

      </div>
    )
  }
}
