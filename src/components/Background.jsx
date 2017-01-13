import React, { Component } from 'react';

export default class Background extends Component {

  constructor(props) {
    super(props);

    this.tl; // eslint-disable-line

  }


  render() {

    switch (this.props.location.pathname) {
      case "/create-bouquet":
        if(this.tl) this.tl.resume();
        break;

      case "/description":
        if(this.tl) this.tl.tweenTo("Closed");
      break;

      default:
        // Do nothing
    }

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
        <div
          id="paper"
          key="paper"
          ref={
            (el) => {
              this.el = el;
            }
          }
        >

        <img role="presentation" id="cloud1" className="cloud" src="/images/background/cloud-1.png" />
        <img role="presentation" id="cloud2" className="cloud" src="/images/background/cloud-2.png" />


          <svg id="line-top" className="line-decoration" viewBox="0 0 1400 50">
            <path className="segment" d="M0 0.5 H660 Q690 0.5, 700 20 Q710 0.5, 740 0.5 H1400" vectorEffect="non-scaling-stroke"  />
          </svg>

          <svg id="line-left" className="line-decoration" viewBox="0 0 2 860">
            <path d="M0.5 0 V860" vectorEffect="non-scaling-stroke"  />
          </svg>

          <svg id="line-right" className="line-decoration" viewBox="0 0 2 860">
            <path d="M0.5 0 V860" vectorEffect="non-scaling-stroke"  />
          </svg>

          <svg id="line-bottom" className="line-decoration" viewBox="0 0 1400 2">
            <path d="M0 0.5 H1400" vectorEffect="non-scaling-stroke"  />
          </svg>





          <img role="presentation" id="top-left" className="corner" src="/images/background/detail-corner.svg" />
          <img role="presentation" id="top-right" className="corner" src="/images/background/detail-corner.svg" />
          <img role="presentation" id="bottom-left" className="corner" src="/images/background/detail-corner.svg" />
          <img role="presentation" id="bottom-right" className="corner" src="/images/background/detail-corner.svg" />
          <img className="logo" src="./images/lof-logo.png" alt="The Language of Flowers" title="The Language of Flowers" />
        </div>
      </div>
    )
  }




  /* Animation */
  animateIn(callback, delay) {
    // TweenMax.from(this.el, 1, { // eslint-disable-line
    //   autoAlpha:0,
    //   delay: delay || 0,
    //   onComplete:callback
    // });
  }

  animateOut(callback) {
    // TweenMax.to(this.el, 1, { // eslint-disable-line
    //   autoAlpha:0,
    //   ease: "Power4.easeIn",
    //   onComplete:callback
    // });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    console.log("Background Will enter");
  }

  componentDidEnter() {
    console.log("Background Did enter");
  }

  componentWillAppear(callback) {
    // console.log("Background Will appear");

    this.tl = new TimelineMax({onComplete:callback}); // eslint-disable-line

    this.tl.from(this.el, 0.5, {autoAlpha:0})
    this.tl.from(".border-top", 0.8, {
      drawSVG: 0,
      ease: "Power1.easeInOut"
    })

    this.tl.addPause("Closed")
    this.tl.to(".border-top", 0.8, {
      drawSVG:"10% 100%",
      ease: "Power1.easeInOut"
    })

  }

  componentDidAppear() {
    // console.log("Background Did appear");
  }

  componentWillLeave(callback) {
    // console.log("Background Will leave");
  }

  componentDidLeave() {
    // console.log("Background Did leave");
  }

}
