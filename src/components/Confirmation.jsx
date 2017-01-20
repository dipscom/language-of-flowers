import React, { Component } from 'react';
import Anchor from './Anchor';
import Flower from './Flower';

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
          		<svg className="doubleline-decoration" viewBox="0 0 1400 40">
          			<path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
          			<path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
            </svg>
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
	          <p className="terms">Be in with a chance to win the full Penhaligon's portraits collection.<br/>Plus join the very Penhaligon's club and discover our online secrets <label htmlFor="terms">(I agree with the Terms and Conditions/Privacy Policy). </label><input type="checkbox" name="terms" onChange={(e) => this.props.updateField(e)} /></p>
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
  componentWillEnter(callback) {
    // console.log("Confirmation Will enter");
    let currentTarget = "#" + this.el.id;
    TweenMax.from(currentTarget, 0.5, { // eslint-disable-line
      autoAlpha:0,
      delay:0.5,
      onComplete:callback
    });
  }


  componentWillLeave(callback) {
    // console.log("Confirmation Will leave");
    let currentTarget = "#" + this.el.id;
    TweenMax.to(currentTarget, 0.5, { // eslint-disable-line
      autoAlpha:0,
      onComplete:callback
    });
  }



}
