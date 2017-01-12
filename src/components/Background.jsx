import React, { Component } from 'react';

export default class Background extends Component {

  constructor(props) {
    super(props);

    this.tl = null;

  }

  /* Animation */
  componentWillAppear(callback) {
    console.log("Background Will appear");

  }

  componentDidAppear(callback) {
    console.log("Background Did appear");
  }


  render() {

    // switch (this.props.location.pathname) {
    //   case "/create-bouquet":
    //   case "/view-bouquet":
    //   case "/recipient":
    //   case "/sender":
    //     if(this.tl) this.tl.reverse();
    //     break;
    //   default:
    //     if(this.tl) this.tl.play();
    // }

    return (
      <div
        id="background"
        key="background"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
      <img id="top-left" className="corner" src="/images/background/detail-corner.svg" />
      <img id="top-right" className="corner" src="/images/background/detail-corner.svg" />
      <img id="bottom-left" className="corner" src="/images/background/detail-corner.svg" />
      <img id="bottom-right" className="corner" src="/images/background/detail-corner.svg" />
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
    console.log("Background Will enter");
  }

  componentDidEnter() {
    console.log("Background Did enter");
  }

  componentWillAppear(callback) {
    console.log("Background Will appear");
  }

  componentDidAppear() {
    console.log("Background Did appear");
  }

  componentWillLeave(callback) {
    console.log("Background Will leave");
  }

  componentDidLeave() {
    console.log("Background Did leave");
  }

}
