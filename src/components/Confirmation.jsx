import React, { Component } from 'react';
import Anchor from './Anchor';
import Flower from './Flower';
import FadeOut from '../animation/FadeOut';
import OverlayIn from '../animation/OverlayIn';
import ResetScroller from '../animation/ResetScroller';
import CloudsLoop from '../animation/CloudsLoop';




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
    this.logoTl = TweenMax.to("#lof-logo", 1, {autoAlpha:0, paused:true, ease:"Linear.easeNone"}); // eslint-disable-line
  }

  render() {
    // let disabled;
    // if(!this.props.terms) {
    //   disabled = 'disabled';
    // }
    return (
      <div
        id="confirmation"
        className="page"
        ref={
          (el) => {
            this.el = el;
          }
        }>
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
          	<p><strong>On this fine day Penhaligon’s will send your message of:</strong></p>
          	<ol className="bouquet-list">
	          	{this.props.bouquet
	          		.map(key =>
	          			<Flower
		      					key={key}
		      					index={key}
		      					details={this.props.flowers[key]} />)
	          	}
	          </ol>
	          <p><strong>...to your dearest <span>{this.props.recipient.name}</span> at the postal address of <span>{this.props.recipient.email}</span> from <span>{this.props.sender.name}</span> <span>({this.props.sender.email})</span>.</strong></p>
	          <p className="terms"><label htmlFor="terms">Be in with a chance to win the full Penhaligon's Portraits collection.<br/>Plus join the very Penhaligon's club and discover our online secrets (I agree with the <a href="https://www.penhaligons.com/competition-terms--conditions/" title="Terms and Conditions" target="_blank">Terms and Conditions</a>/<a href="https://www.penhaligons.com/privacy-policy/" title="Privacy Policy" target="_blank">Privacy Policy</a>). </label><input type="checkbox" id="terms" name="terms" onChange={(e) => this.props.updateField(e)} /></p>
	          <nav className="navigation">
	          	<Anchor cta="Send now" step="forward" target="success" click={this.props.mailChimp} />
	          	<Anchor cta="Change details" step="backward" target="build-bouquet" />
	          </nav>
          </div>
        </div>
      </div>
    )
  }

  /* Animation */
  animateIn(callback, delay) {
    let tl = new TimelineMax({delay:delay || 0, onStart:callback}); // eslint-disable-line
    let currentTarget = this.el;
    let dur = 1.6;

    ResetScroller('form');

    // Make sure the logo is centered on its x-axis
    tl.set("#lof-logo", {xPercent:-50});

    tl.add(OverlayIn())

    tl.from(currentTarget, dur, {autoAlpha:0}, "-="+dur);
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
    let scrollY = document.getElementById('scroller').scrollTop;
    this.latestKnownScrollY = scrollY;
    this.requestTick();
  }

  requestTick() {
    if(!this.ticking) {
      requestAnimationFrame(this.update);
    }
  }

  update() {
    this.logoTl.progress(this.latestKnownScrollY/100)
    this.ticking = false;
  }


}
