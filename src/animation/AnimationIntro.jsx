import React, { Component } from 'react';
import AnimateOut from './AnimateOut';
import BackgroundIn from './BackgroundIn';
import CloudsLoop from './CloudsLoop';
import OverlayIn from './OverlayIn';

export var AnimationIntro = WrappedComponent => class extends Component {
  componentWillAppear(callback) {

    console.log(this.el);

    // Hide the LOF logo initially
    TweenMax.set("#lof-logo", {autoAlpha:0}); // eslint-disable-line
    // Makes sure the page is always on the top
    TweenMax.set(".page > div", {scrollTo:0}); // eslint-disable-line

    // Infinite Clouds loop
    // let cloudsLoop = CloudsLoop(); // Either of these is fine
    // CloudsLoop(); // Either of these is fine

    // Intro animation
    let tl = new TimelineMax(); // eslint-disable-line

    // Background section
    tl.add(BackgroundIn())

    // Overlay section
    tl.add(OverlayIn())


    // Introduction section
    .add(this.contentAnimation(callback), "-=1.5")

    .add("People", "-=1")
    .from(["#man","#lady"], 1, {autoAlpha:0}, "People")
    .from("#man", 1, {xPercent:10}, "People")
    .from("#lady", 1, {xPercent:-10}, "People")

  }

  contentAnimation(callback) {
    let tl = new TimelineMax(); // eslint-disable-line

    tl.staggerFrom(["#penhaligons-logo", "hr", "h1", "p", "strong"], 1.5, {
        autoAlpha:0,
        ease:"Power1.easeOut"
      }, 0.3, "StaggerContent")
      .staggerFrom(["#penhaligons-logo", "hr", "h1", "p", "strong"], 1.5, {
        y:10,
        ease:"Power4.easeOut"
      }, 0.3, "StaggerContent")
      .from(".button", 0.5, {
        autoAlpha:0,
        ease:"Power4.easeInOut",
        onStart:callback
      })

    return tl;
  }






  componentWillEnter(callback) {
    // Show the spare logo in the background component
    TweenMax.to("#lof-logo", 0.5, {autoAlpha:0, ease: "Power4.easeInOut"}); // eslint-disable-line
    // Open space for the logo
    TweenMax.to("#line-top > .segment", 0.8, { // eslint-disable-line
      drawSVG: "0% 100%",
      ease: "Power4.easeInOut"
    });

    let tl = new TimelineMax(); // eslint-disable-line

    tl.add(this.contentAnimation(callback))
  }

  componentWillLeave(callback) {
    AnimateOut("#introduction", callback);
  }

  render() {
    return <WrappedComponent />
  }
}
