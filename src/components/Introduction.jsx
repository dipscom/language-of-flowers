import React, { Component } from 'react';
import Anchor from './Anchor';

export default class Introduction extends Component {
  render() {

    // console.log("--> Introduction render");

    return (
      <div
        id="introduction"
        key="introduction"
        className="page"
        >
        <div>
          <div>
            {/*<img className="logo" src="./images/penhalions-logo.svg" alt="Penhaligon's - est. London 1870 - Portraits" title="Penhaligon's - est. London 1870 - Portraits" />*/}
            <header>
              <svg className="doubleline-decoration" viewBox="0 0 1400 40" preserveAspectRatio="xMidYMid">
                <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
              </svg>
              <h1>Some things are unutterable and secret. Other thoughts are so hard to say...</h1>
              <svg className="doubleline-decoration reflected" viewBox="0 0 1400 40">
                  <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                  <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
                </svg>
            </header>
            <p>Thank Heavens for the coded art of flowers. A mysterious language - of love? Cryptic communications, secret assignations, hidden revelations, coded declarations! Floriography. Oh! what a gift! Quel cadeau.</p>
            <p><strong>Penhaligon&#39;s invites you to send your very own coded bouquet.</strong></p>
            <nav className="navigation">
              <Anchor cta="Lets begin" step="forward" target="description" />
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
    // console.log("Introduction Will enter");
    this.animateIn(callback, 1);
  }

  componentDidEnter() {
    // console.log("Introduction Did enter");
  }

  componentWillAppear(callback) {
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
      .staggerFrom(["h1", "p", "strong"], 1.5, {
      autoAlpha:0,
      ease:"Power1.easeOut"
    }, 0.3, "StaggerContent")
      .staggerFrom(["h1", "p", "strong"], 1.5, {
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
    // console.log("Introduction Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    // console.log("Introduction Did leave");
  }

}
