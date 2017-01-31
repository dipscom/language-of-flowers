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
	          <p><strong>...to your dearest <span>{this.props.recipient.name}</span> at the email address of <span>{this.props.recipient.email}</span> from <span>{this.props.sender.name}</span> <span>({this.props.sender.email})</span>.</strong></p>
	          <p className="terms"><label htmlFor="terms">Be in with a chance to win the full Penhaligon's Portraits Collection.<br/>Plus join the very Penhaligon's club and discover our online secrets (I agree with the <a href="https://www.penhaligons.com/competition-terms-conditions/" title="Terms and Conditions" target="_blank">Terms and Conditions</a>/<a href="https://www.penhaligons.com/privacy-policy/" title="Privacy Policy" target="_blank">Privacy Policy</a>). </label><input type="checkbox" id="terms" name="terms" onChange={(e) => this.props.updateField(e)} /></p>
	          <nav className="navigation">
	          	<Anchor cta="Send now" step="forward" target="success" click={this.props.mailChimp} />
	          	<Anchor cta="Change details" step="backward" target="buildbouquet" />
	          </nav>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{ __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1799154187025873');
            fbq('track', 'PageView');
          `}} />
          <script
          dangerouslySetInnerHTML={{ __html: `
            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            document.write('<iframe src="https://6100181.fls.doubleclick.net/activityi;src=6100181;type=lof123;cat=penha0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
          `}} />
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
