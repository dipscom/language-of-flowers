import React, { Component } from 'react';
import { gsap } from 'gsap';
import FadeOut from './FadeOut';
import BackgroundIn from './BackgroundIn';
import CloudsLoop from './CloudsLoop';
import ContentIn from './ContentIn';
import OverlayIn from './OverlayIn';
import PeopleIn from './PeopleIn';
import ResetScroller from './ResetScroller';

export var AnimationIntro = WrappedComponent => class extends Component {
  animateAppear(callback) {

    // Hide the LOF logo and Start again button initially
    gsap.set("#lof-logo", {xPercent:-50, autoAlpha:0});
    gsap.set("#reset-button", {autoAlpha:0});

    // Reset the scroller position
    ResetScroller(this.element.trg.id);

    // Clouds infinite loop
    CloudsLoop();

    // Intro animation
    let tl = gsap.timeline();

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
        .to("#reset-button", {autoAlpha:1, duration: 0.5}, "Content")
    }

    // Make sure the space for the logo is closed
    tl.to("#line-top > .segment", {
      drawSVG: "0% 100%",
      ease: "power2.inOut",
      duration: 0.8
    }, "Content");

    // Them people
    tl.add("People", "-=1")
      .add(PeopleIn(), "People")

  }


  animateEnter(callback) {
    // Reset the scroller position
    ResetScroller(this.element.trg.id);

    let tl = gsap.timeline();

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
        .to("#reset-button", {autoAlpha:1, duration: 0.5}, "Start")
    }
    // Make sure the space for the logo is closed
    tl.to("#line-top > .segment", {
      drawSVG: "0% 100%",
      ease: "power2.inOut",
      duration: 0.8
    }, "Start");

  }

  animateLeave(callback) {
    FadeOut(this.element.trg.id, callback);
  }


  showLOF() {
    let tl = gsap.timeline();

    // Make sure the logo is centered on its x-axis
    tl.set("#lof-logo", {xPercent:-50})

    // Show the spare logo in the background component
    tl.to("#lof-logo", {autoAlpha:1, scale:1, yPercent:0, ease:"power2.inOut", duration: 0.8}, 0);

    return tl;
  }

  hideLOF() {
    let tl = gsap.timeline();

    // Hide the spare logo in the background component
    tl.to("#lof-logo", {autoAlpha:0, ease: "power4.inOut", duration: 0.5}, 0);

    return tl;
  }

  render() {
    return <WrappedComponent ref={ el => this.element = el } {...this.props} />
  }
}
