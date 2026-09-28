import React, { Component } from "react";
import Anchor from "./Anchor";
import FadeOut from "../animation/FadeOut";
import CloudsLoop from "../animation/CloudsLoop";

export default class Success extends Component {
  constructor() {
    super();

    this.latestKnownScrollY = 0;
    this.ticking = false;
    this.onScroll = this.onScroll.bind(this);
    this.update = this.update.bind(this);
    this.logoTl = null;
  }
  componentDidMount() {
    this.logoTl = TweenMax.to("#lof-logo", 1, {
      autoAlpha: 0,
      paused: true,
      ease: "Linear.easeNone",
    }); // eslint-disable-line
  }
  render() {
    return (
      <div
        id="success"
        className="page"
        ref={(el) => {
          this.el = el;
        }}
      >
        <div id="scroller" onScroll={this.onScroll}>
          <div id="thank-you">
            <header>
              <h1>Thank You!</h1>
              <hr />
            </header>
            <p>
              <strong>Your encoded bouquet has been sent.</strong>
            </p>

            <p>Would you like to send another bouquet?</p>
            <p>
              <Anchor
                cta="start again"
                step="forward"
                target="/"
                click={this.props.reset}
              />
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* Animation */
  animateIn(callback, delay) {
    let tl = new TimelineMax({ delay: delay || 0, onStart: callback }); // eslint-disable-line
    let currentTarget = "#" + this.el.id;
    let dur = 1.6;

    // Make sure the logo is centered on its x-axis
    tl.set("#lof-logo", { xPercent: -50 });

    tl.from(currentTarget, dur, { autoAlpha: 0 });
  }

  componentWillAppear(callback) {
    // console.log("Success Will appear");
    this.animateIn(callback);

    // Clouds infinite loop
    CloudsLoop();
  }

  componentWillEnter(callback) {
    // console.log("Success Will enter");
    this.animateIn(callback, 0.5);
  }

  componentWillLeave(callback) {
    FadeOut(this.el.id, callback);
  }

  onScroll() {
    let scrollY = document.getElementById("scroller").scrollTop;
    this.latestKnownScrollY = scrollY;
    this.requestTick();
  }

  requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(this.update);
    }
  }

  update() {
    this.logoTl.progress(this.latestKnownScrollY / 100);
    this.ticking = false;
  }
}
