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

    // Create a label to align all the content together and be able to overlap it all with other animation
    tl.add("Content", "-=1.5")
    // Contents section
    tl.add(ContentIn(this.element.trg, callback), "Content")
    // Show/Hide LOF logo
    // & add the content animation
    // depending on target component
    if(this.element.trg.id === "introduction") {
      tl.add(this.hideLOF(), "Content")
    } else {
      tl.add(this.showLOF(), "Content")
    }


    // Them people
    tl.add("People", "-=1")
    .from(["#man","#lady"], 1, {autoAlpha:0}, "People")
    .from("#man", 2, {xPercent:10, ease:Back.easeOut.config(3)}, "People")// eslint-disable-line
    .from("#lady", 2, {xPercent:-10, ease:Back.easeOut.config(3)}, "People")// eslint-disable-line

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
      tl.add(this.hideLOF(), "Start")
    } else {
      tl.add(this.showLOF(), "Start")
    }
  }

  componentWillLeave(callback) {
    AnimateOut(this.element.trg, callback);
  }


  showLOF() {
    let tl = new TimelineMax(); // eslint-disable-line

    // Show the spare logo in the backgtround component
    tl.to("#lof-logo", 0.5, {autoAlpha:1, delay:0.5}, 0); // eslint-disable-line
    // Open the space for the logo
    tl.to("#line-top > .segment", 0.8, { // eslint-disable-line
      drawSVG: "30% 100%",
      ease: "Power4.easeInOut"
    }, 0);

    return tl;
  }

  hideLOF() {
    let tl = new TimelineMax(); // eslint-disable-line

    // Hide the spare logo in the background component
    tl.to("#lof-logo", 0.5, {autoAlpha:0, ease: "Power4.easeInOut"}, 0); // eslint-disable-line
    // Close the space for the logo
    tl.to("#line-top > .segment", 0.8, { // eslint-disable-line
      drawSVG: "0% 100%",
      ease: "Power4.easeInOut"
    }, 0);

    return tl;
  }

  render() {
    return <WrappedComponent ref={ el => this.element = el } />
  }
}
