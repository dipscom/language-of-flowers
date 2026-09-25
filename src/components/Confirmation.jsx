import React, { Component } from "react";
import { gsap } from "gsap";
import Anchor from "./Anchor";
import Flower from "./Flower";
import FadeOut from "../animation/FadeOut";
import OverlayIn from "../animation/OverlayIn";
import ResetScroller from "../animation/ResetScroller";
import CloudsLoop from "../animation/CloudsLoop";

export default class Confirmation extends Component {
  constructor() {
    super();

    this.latestKnownScrollY = 0;
    this.ticking = false;
    this.onScroll = this.onScroll.bind(this);
    this.update = this.update.bind(this);
    this.logoTl = null;
  }
  componentDidMount() {
    this.logoTl = gsap.to("#lof-logo", {
      autoAlpha: 0,
      paused: true,
      ease: "none",
      duration: 1,
    });
  }

  render() {
    return (
      <div
        id="confirmation"
        className="page"
        ref={(el) => {
          this.el = el;
        }}
      >
        <div id="scroller" onScroll={this.onScroll}>
          <div>
            <header>
              <h1>Confirm & Send</h1>
              {/*<svg className="doubleline-decoration" viewBox="0 0 1400 40">
          			<path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
          			<path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
            </svg>*/}
              <hr />
            </header>
            <p>
              <strong>On this fine day we will send your message of:</strong>
            </p>
            <ol className="bouquet-list">
              {this.props.bouquet.map((key) => (
                <Flower
                  key={key}
                  index={key}
                  details={this.props.flowers[key]}
                />
              ))}
            </ol>
            <p>
              <strong>
                ...to your dearest <span>{this.props.recipient.name}</span> at
                the email address of <span>{this.props.recipient.email}</span>{" "}
                from <span>{this.props.sender.name}</span>{" "}
                <span>({this.props.sender.email})</span>.
              </strong>
            </p>
            <nav className="navigation">
              <Anchor
                cta="Send now"
                step="forward"
                target="success"
                click={this.props.mailChimp}
              />
              <Anchor
                cta="Change details"
                step="backward"
                target="buildbouquet"
              />
            </nav>
          </div>
        </div>
      </div>
    );
  }

  /* Animation */
  animateIn(callback, delay) {
    let tl = gsap.timeline({ delay: delay || 0, onStart: callback });
    let currentTarget = this.el;
    let dur = 1.6;

    ResetScroller("form");

    // Make sure the logo is centered on its x-axis
    tl.set("#lof-logo", { xPercent: -50 });

    tl.add(OverlayIn());

    tl.from(currentTarget, { autoAlpha: 0, duration: dur }, "-=" + dur);
  }

  animateAppear(callback) {
    this.animateIn(callback, 0.5);

    // Clouds infinite loop
    CloudsLoop();
  }

  animateEnter(callback) {
    this.animateIn(callback, 0.5);
  }

  animateLeave(callback) {
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
