import React, { Component } from 'react';

export default class Success extends Component{
  render() {
    return (
      <div
        key="confirmation"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <h1>Thank You!</h1>
        <p>Your encoded bouquet has been sent.</p>
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
      ease: Power2.easeIn, // eslint-disable-line
      onComplete:callback
    });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    console.log("Confirmation Will enter");
    this.animateIn(callback, 1);
  }

  componentDidEnter() {
    console.log("Confirmation Did enter");
  }

  componentWillAppear(callback) {
    console.log("Confirmation Will appear");
  }

  componentDidAppear() {
    console.log("Confirmation Did appear");
  }

  componentWillLeave(callback) {
    console.log("Confirmation Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    console.log("Confirmation Did leave");
  }

}
