import React, { Component } from 'react';
import Anchor from './Anchor';

export default class MyBouquet extends Component{
  render() {
    return (
      <div
        id="my-bouquet"
        key="my-bouquet"
        className="page"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <div>
          <div>
            {/*<img className="logo" src="./images/lof-logo.png" alt="The Language of Flowers" title="The Language of Flowers" />*/}
            <header>
              <h1>Dear <span>{this.props.recipient.name}...</span></h1>
              <hr />
            </header>
            {/*<svg className="doubleline-decoration" viewBox="0 0 1400 40">
              <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke" />
              <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke" />
            </svg>*/}

            <p><strong>What could be more elegant than a bouquet of flowers!</strong></p>
            <p>A message that speaks a 1000 as yet unknown words...</p>
            <p><strong>Find out <span>{this.props.sender.name}’s</span> innermost feelings for you.</strong></p>
            <nav className="navigation">
              <Anchor cta="Decode your bouquet" step="forward" target="viewbouquet" />
            </nav>
          </div>
        </div>
      </div>
    )
  }


    /* Animation */
  animateIn(callback, delay) {
    TweenMax.from("#introduction", 0.5, { // eslint-disable-line
      autoAlpha:0,
      delay: delay || 0,
      onComplete:callback
    });
  }

  animateOut(callback) {
    TweenMax.to("#introduction", 0.5, { // eslint-disable-line
      autoAlpha:0,
      ease: "Power4.easeIn",
      onComplete:callback
    });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    // Hide the spare logo in the backgtround component
    TweenMax.to("#lof-logo", 0.5, {autoAlpha:0, delay:0.5}); // eslint-disable-line

    // console.log("Introduction Will enter");
    this.animateIn(callback, 0.5);
  }

  componentDidEnter() {
    // console.log("Introduction Did enter");
  }

  componentWillAppear(callback) {
    // Hide the spare logo in the backgtround component
    TweenMax.set("#lof-logo", {autoAlpha:0}); // eslint-disable-line


    this.tl = new TimelineMax({delay:3}) // eslint-disable-line
    // console.log("Introduction Will appear");
    // this.tl.from(".logo", 1, {
    //   autoAlpha:0,
    //   ease:"Power1.easeOut"
    // }, 0)
    //   .from(".logo", 1.3, {
    //   scale:1.2,
    //   ease:"Power4.easeOut"
    // }, 0)

      .add("StaggerContent", "-=0.5")
      .staggerFrom(["#penhaligons-logo", "hr", "h1", "p", "strong"], 1.5, {
      autoAlpha:0,
      ease:"Power1.easeOut"
    }, 0.3, "StaggerContent")
      .staggerFrom(["#penhaligons-logo", "hr", "h1", "p", "strong"], 1.5, {
      y:10,
      ease:"Power4.easeOut"
    }, 0.3, "StaggerContent")

      .staggerFrom(".segment", 1, {
        drawSVG:"50% 50%",
        ease:"Power2.easeInOut"
      }, 0.15, 1)
      .from(".button", 0.5, {
        autoAlpha:0,
        ease:"Power4.easeInOut",
        onStart:callback
      })
  }

  componentDidAppear() {
    // console.log("Introduction Did appear");
  }

  componentWillLeave(callback) {
    // Show the spare logo in the backgtround component
    TweenMax.to("#lof-logo", 0.5, {autoAlpha:1, delay:0.5}); // eslint-disable-line

    // console.log("Introduction Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    // console.log("Introduction Did leave");
  }

}
