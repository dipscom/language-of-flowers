import React, { Component } from 'react';
import Anchor from './Anchor';
import Flower from './Flower';
import AnimateOut from '../animation/AnimateOut';
import OverlayIn from '../animation/OverlayIn';
import ResetScroller from '../animation/ResetScroller';



export default class Confirmation extends Component {
  render() {
    let disabled;
    if(!this.props.terms) {
      disabled = 'disabled';
    }
    return (
      <div
        id="confirmation"
        className="page"
        ref={
          (el) => {
            this.el = el;
          }
        }>
        <div>
        	<div>
          	<header>
          		<h1>Confirm & Send</h1>
          		{/*<svg className="doubleline-decoration" viewBox="0 0 1400 40">
          			<path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
          			<path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
            </svg>*/}
            <hr />
          	</header>
          	<p><strong>On this fine day we shalt send your message of:</strong></p>
          	<ol className="bouquet-list">
	          	{this.props.bouquet
	          		.map(key =>
	          			<Flower
		      					key={key}
		      					index={key}
		      					details={this.props.flowers[key]} />)
	          	}
	          </ol>
	          <p><strong>...to your dearest <span>{this.props.recipient.name}</span> at the royal postal address of <span>{this.props.recipient.email}</span> from <span>{this.props.sender.name}</span> <span>({this.props.sender.email})</span>.</strong></p>
	          <p className="terms"><label htmlFor="terms">Be in with a chance to win the full Penhaligon's portraits collection.<br/>Plus join the very Penhaligon's club and discover our online secrets (I agree with the Terms and Conditions/Privacy Policy). </label><input type="checkbox" id="terms" name="terms" onChange={(e) => this.props.updateField(e)} /></p>
	          <nav className="navigation">
	          	<Anchor className={disabled} cta="Send now" step="forward" target="success" click={this.props.mailChimp} />
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
  }

  componentWillEnter(callback) {
    // console.log("Confirmation Will enter");
    this.animateIn(callback, 0.5);
  }

  componentWillLeave(callback) {
    // console.log("Confirmation Will leave");
    AnimateOut(this.el, callback);
  }

}
