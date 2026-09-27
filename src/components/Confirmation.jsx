import React, { Component } from "react";
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
    this.logoTl = TweenMax.to("#lof-logo", 1, {
      autoAlpha: 0,
      paused: true,
      ease: "Linear.easeNone",
    }); // eslint-disable-line
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
            {this.props.sendStatus === "error" && (
              <p className="send-error">
                {this.props.sendError} Please try again.
              </p>
            )}
            <nav className="navigation">
              <Anchor
                cta={
                  this.props.sendStatus === "sending" ? "Sending…" : "Send now"
                }
                step="forward"
                target="success"
                click={
                  this.props.sendStatus === "sending"
                    ? (e) => e.preventDefault()
                    : this.props.sendBouquet
                }
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
    let tl = new TimelineMax({ delay: delay || 0, onStart: callback }); // eslint-disable-line
    let currentTarget = this.el;
    let dur = 1.6;

    ResetScroller("form");

    // Make sure the logo is centered on its x-axis
    tl.set("#lof-logo", { xPercent: -50 });

    tl.add(OverlayIn());

    tl.from(currentTarget, dur, { autoAlpha: 0 }, "-=" + dur);
  }

  componentWillAppear(callback) {
    // console.log("Confirmation Will appear");
    this.animateIn(callback, 0.5);

    // Clouds infinite loop
    CloudsLoop();
  }

  componentWillEnter(callback) {
    // console.log("Confirmation Will enter");
    this.animateIn(callback, 0.5);
  }

  componentWillLeave(callback) {
    // console.log("Confirmation Will leave");
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
