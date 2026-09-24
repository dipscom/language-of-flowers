import React, { Component } from "react";
import { gsap } from "gsap";
import Anchor from "./Anchor";
import FadeOut from "../animation/FadeOut";
import BackgroundIn from "../animation/BackgroundIn";
import CloudsLoop from "../animation/CloudsLoop";
import ContentIn from "../animation/ContentIn";
import PeopleIn from "../animation/PeopleIn";
import OverlayIn from "../animation/OverlayIn";
import ResetScroller from "../animation/ResetScroller";

export default class MyBouquet extends Component {
  render() {
    return (
      <div
        id="my-bouquet"
        key="my-bouquet"
        className="page"
        ref={(el) => {
          this.el = el;
        }}
      >
        <div>
          <div>
            {/*<img className="logo" src="./images/lof-logo.png" alt="The Language of Flowers" title="The Language of Flowers" />*/}
            <header>
              <h1>
                Dear <span>{this.props.recipient.name}...</span>
              </h1>
              <hr />
            </header>
            {/*<svg className="doubleline-decoration" viewBox="0 0 1400 40">
              <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke" />
              <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke" />
            </svg>*/}

            <p>
              <strong>
                What could be more elegant than a bouquet of flowers!
              </strong>
            </p>
            <p>A message that speaks a 1000 as yet unknown words...</p>
            <p>
              <strong>
                Find out <span>{this.props.sender.name}'s</span> innermost
                feelings for you.
              </strong>
            </p>
            <nav className="navigation">
              <Anchor
                cta="Decode your bouquet"
                step="forward"
                target="viewbouquet"
              />
            </nav>
          </div>
        </div>
      </div>
    );
  }

  animateAppear(callback) {
    // Hide the LOF logo and Start again button initially
    gsap.set("#lof-logo", { xPercent: -50, autoAlpha: 0 });

    // Reset the scroller position
    ResetScroller(this.el.id);

    // Clouds infinite loop
    CloudsLoop();

    // Intro animation
    let tl = gsap.timeline();

    // Background section
    tl.add(BackgroundIn());

    // Overlay section
    tl.add(OverlayIn());

    // Create a label to align all the content together and be able to overlap it all with other animation
    tl.add("Content", "-=1.5");
    // Contents section
    tl.add(ContentIn(this.el, callback), "Content");
    // Show/Hide LOF logo
    // & add the content animation
    // depending on target component
    if (this.el.id === "introduction") {
      tl.add(this.hideLOF(), "Content");
    } else {
      tl.add(this.showLOF(), "Content").to(
        "#reset-button",
        { autoAlpha: 1, duration: 0.5 },
        "Content",
      );
    }

    // Them people
    tl.add("People", "-=1").add(PeopleIn(), "People");
  }

  animateEnter(callback) {
    // Reset the scroller position
    ResetScroller(this.el.id);

    let tl = gsap.timeline();

    // Use this label to offset the whole animation
    tl.add("Start", 0.5);
    // Introduction section
    tl.add(ContentIn(this.el, callback), "Start");
    // Show/Hide LOF logo
    // & add the content animation
    // depending on target component
    if (this.el.id === "introduction") {
      tl.add(this.hideLOF(), "Start");
    } else {
      tl.add(this.showLOF(), "Start").to(
        "#reset-button",
        { autoAlpha: 1, duration: 0.5 },
        "Start",
      );
    }
    // Make sure the space for the logo is closed
    tl.to(
      "#line-top > .segment",
      {
        drawSVG: "0% 100%",
        ease: "power2.inOut",
        duration: 0.8,
      },
      "Start",
    );
  }

  animateLeave(callback) {
    FadeOut(this.el.id, callback);
  }

  showLOF() {
    let tl = gsap.timeline();

    // Make sure the logo is centered on its x-axis
    tl.set("#lof-logo", { xPercent: -50 });

    // Show the spare logo in the background component
    tl.to(
      "#lof-logo",
      { autoAlpha: 1, scale: 1, yPercent: 0, ease: "power2.inOut", duration: 0.8 },
      0,
    );

    return tl;
  }

  hideLOF() {
    let tl = gsap.timeline();

    // Hide the spare logo in the background component
    tl.to("#lof-logo", { autoAlpha: 0, ease: "power4.inOut", duration: 0.5 }, 0);

    return tl;
  }
}
