import React, { Component } from 'react';
import AnimateOut from './AnimateOut';
import BackgroundIn from './BackgroundIn';
import CloudsLoop from './CloudsLoop';
import ContentIn from './ContentIn';
import OverlayIn from './OverlayIn';
import ResetScroller from './ResetScroller';

export var AnimationIntro = WrappedComponent => class extends Component {
  componentWillAppear(callback) {

    // Hide the LOF logo and Start again button initially
    TweenMax.set("#lof-logo", {xPercent:-50, autoAlpha:0}); // eslint-disable-line
    TweenMax.set("#reset-button", {autoAlpha:0}); // eslint-disable-line

    // Reset the scroller position
    ResetScroller(this.element.trg.id);

    // Clouds infinite loop
    CloudsLoop();

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
        .to("#reset-button", 0.5, {autoAlpha:1}, "Content")
    }

    // Make sure the space for the logo is closed
    tl.to("#line-top > .segment", 0.8, {
      drawSVG: "0% 100%",
      ease: "Power2.easeInOut"
    }, "Content");



    // Them people
    tl.add("People", "-=1")
    .from(["#man","#lady"], 1, {autoAlpha:0}, "People")
    .from("#man", 2, {xPercent:10}, "People")// eslint-disable-line
    .from("#lady", 2, {xPercent:-10}, "People")// eslint-disable-line

  }


  componentWillEnter(callback) {
    // Reset the scroller position
    ResetScroller(this.element.trg.id);

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
        .to("#reset-button", 0.5, {autoAlpha:1}, "Start")
    }
    // Make sure the space for the logo is closed
    tl.to("#line-top > .segment", 0.8, {
      drawSVG: "0% 100%",
      ease: "Power2.easeInOut"
    }, "Start");

  }

  componentWillLeave(callback) {
    AnimateOut(this.element.trg, callback);
  }


  showLOF() {
    let tl = new TimelineMax(); // eslint-disable-line

    // Make sure the logo is centered on its x-axis
    tl.set("#lof-logo", {xPercent:-50})

    // Show the spare logo in the background component
    tl.to("#lof-logo", 0.8, {autoAlpha:1, scale:1, yPercent:0, ease:"Power2.easeInOut"}, 0);

    return tl;
  }

  hideLOF() {
    let tl = new TimelineMax(); // eslint-disable-line

    // Hide the spare logo in the background component
    tl.to("#lof-logo", 0.5, {autoAlpha:0, ease: "Power4.easeInOut"}, 0);

    return tl;
  }

  render() {
    return <WrappedComponent ref={ el => this.element = el } />
  }
}
