import React, { Component } from 'react';
import AnimateOut from './AnimateOut';
import BackgroundIn from './BackgroundIn';
// import CloudsLoop from './CloudsLoop';
import ContentIn from './ContentIn';
import OverlayIn from './OverlayIn';
import ResetScroller from './ResetScroller';

export var AnimationIntro = WrappedComponent => class extends Component {
  componentWillAppear(callback) {

    // Hide the LOF logo initially
    TweenMax.set("#lof-logo", {autoAlpha:0}); // eslint-disable-line

    // Reset the scroller position
    ResetScroller(this.element.trg);

    // Clouds infinite loop
    // CloudsLoop();

    // Intro animation
    let tl = new TimelineMax(); // eslint-disable-line

    // Background section
    tl.add(BackgroundIn())

    // Overlay section
    tl.add(OverlayIn())

    // Contents section
    tl.add(ContentIn(this.element.trg, callback), "-=1.5")

    // Them people
    tl.add("People", "-=1")
    .from(["#man","#lady"], 1, {autoAlpha:0}, "People")
    .from("#man", 1, {xPercent:10}, "People")
    .from("#lady", 1, {xPercent:-10}, "People")

  }


  componentWillEnter(callback) {
    // Reset the scroller position
    ResetScroller(this.element.trg);

    let tl = new TimelineMax(); // eslint-disable-line

    // Use this label to offset the whole animation
    tl.add("Start", 0.5)
    // Introduction section
    tl.add(ContentIn(this.element.trg, callback), "Start")
    // Show/Hide LOF logo
    // & add the content animation
    // depending on target component
    if(this.element.trg.id === "introduction") {
      // Hide the spare logo in the background component
      tl.to("#lof-logo", 0.5, {autoAlpha:0, ease: "Power4.easeInOut"}, "Start"); // eslint-disable-line
      // Close the space for the logo
      tl.to("#line-top > .segment", 0.8, { // eslint-disable-line
        drawSVG: "0% 100%",
        ease: "Power4.easeInOut"
      }, "Start");
    } else {
      // Show the spare logo in the backgtround component
      tl.to("#lof-logo", 0.5, {autoAlpha:1, delay:0.5}, "Start"); // eslint-disable-line
      // Open the space for the logo
      tl.to("#line-top > .segment", 0.8, { // eslint-disable-line
        drawSVG: "30% 100%",
        ease: "Power4.easeInOut"
      }, "Start");
    }
  }

  componentWillLeave(callback) {
    AnimateOut(this.element.trg, callback);
  }

  render() {
    return <WrappedComponent ref={ el => this.element = el } />
  }
}
