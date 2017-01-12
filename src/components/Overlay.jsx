import React, { Component } from 'react';

export default class Overlay extends Component {

  constructor() {
    super();

    this.dur = 0.8;
    this.tl = null;

  }
  /* Animation */
  fadeIn(el, opts = {xP:0, yP:0} ) {
    return TweenMax.from(el, 1, {xPercent:opts.xP, yPercent:opts.yP, autoAlpha:0, ease:"Power4.easeOut"}); // eslint-disable-line
  }
  componentWillAppear(callback) {
    console.log("Overlay Will appear");

    this.tl = new TimelineLite({onComplete:callback}); // eslint-disable-line

    // We're using normal CSS selectors because we know for a fact that this component will not be unmounted and/or changed at any time during the existence of this webapp
    this.tl
      .add(this.fadeIn('#flowersBottom', {xP:0, yP:100}), 0)
      .add(this.fadeIn('#flowersBottomRight', {xP:50, yP:10}), 0.1)
      .add(this.fadeIn('#flowersMidLeft', {xP:-50, yP:10}), 0.1)
      .add(this.fadeIn('#flowersTopLeft', {xP:-50, yP:-10}), 0.1)
      .add(this.fadeIn('#flowersTopRight', {xP:50, yP:-10}), 0.1)
      .add(this.fadeIn('#peacock', {xP:-20, yP:10}), 0.3)
      .add(this.fadeIn('#stag', {xP:20, yP:10}), 0.3)
      .add("People", 0.5)
      .add(this.fadeIn('#man', {xP:50, yP:10}), "People")
      .add(this.fadeIn('#lady', {xP:-50, yP:10}), "People")


  }

  componentDidAppear(callback) {
    console.log("Overlay Did appear");
    // Send a response to animate in the introduction section
    // this.props.pageLoaded();
  }


  render() {
    return (
      <div
        id="overlay"
        key="overlay"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >

        <img id="man" src="/images/overlay/man.png" alt="" />

        <img id="flowersBottomRight" src="/images/overlay/flowers-bottomright.png" alt="" className="flowers bottom right" />

        <img id="flowersMidLeft" src="/images/overlay/flowers-midleft.png" alt="" className="flowers mid left" />

        <img id="lady"src="/images/overlay/lady.png" alt=""  />

        <img id="flowersBottom" className="flowers bottom left" src="/images/overlay/flowers-bottom.png" alt="" />

        <img id="flowersTopLeft" src="/images/overlay/flowers-topleft.png" alt="" className="flowers top left" />

        <img id="flowersTopRight" src="/images/overlay/flowers-topright.png" alt="" className="flowers top right" />

        <img id="peacock" src="/images/overlay/peacock.png" alt="" />
        <img id="stag" src="/images/overlay/stag.png" alt="" />


      </div>
    )
  }
}
