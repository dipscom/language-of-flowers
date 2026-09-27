import React, { Component } from "react";
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
            <header>
              <h1>
                Dear <span>{this.props.recipient.name}...</span>
              </h1>
              <hr />
            </header>

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

  componentWillAppear(callback) {
    // Hide the LOF logo and Start again button initially
    TweenMax.set("#lof-logo", { xPercent: -50, autoAlpha: 0 }); // eslint-disable-line

    // Reset the scroller position
    ResetScroller(this.el.id);

    // Clouds infinite loop
    CloudsLoop();

    // Intro animation
    let tl = new TimelineMax(); // eslint-disable-line

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
        0.5,
        { autoAlpha: 1 },
        "Content",
      );
    }

    // Them people
    tl.add("People", "-=1").add(PeopleIn(), "People");
  }

  componentWillEnter(callback) {
    // Reset the scroller position
    ResetScroller(this.el.id);

    let tl = new TimelineMax(); // eslint-disable-line

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
        0.5,
        { autoAlpha: 1 },
        "Start",
      );
    }
    // Make sure the space for the logo is closed
    tl.to(
      "#line-top > .segment",
      0.8,
      {
        drawSVG: "0% 100%",
        ease: "Power2.easeInOut",
      },
      "Start",
    );
  }

  componentDidAppear() {
    // console.log("Introduction Did appear");
  }

  componentWillLeave(callback) {
    FadeOut(this.el.id, callback);
  }

  componentDidLeave() {
    // console.log("Introduction Did leave");
  }

  showLOF() {
    let tl = new TimelineMax(); // eslint-disable-line

    // Make sure the logo is centered on its x-axis
    tl.set("#lof-logo", { xPercent: -50 });

    // Show the spare logo in the background component
    tl.to(
      "#lof-logo",
      0.8,
      { autoAlpha: 1, scale: 1, yPercent: 0, ease: "Power2.easeInOut" },
      0,
    );

    return tl;
  }

  hideLOF() {
    let tl = new TimelineMax(); // eslint-disable-line

    // Hide the spare logo in the background component
    tl.to("#lof-logo", 0.5, { autoAlpha: 0, ease: "Power4.easeInOut" }, 0);

    return tl;
  }
}
