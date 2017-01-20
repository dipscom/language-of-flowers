import React, { Component } from 'react';
import Anchor from './Anchor';

export default class Description extends Component {
  render() {

    // console.log("-> Description render");

    return (
      <div
        id="description"
        key="description"
        className="page"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <div>
        <div>
          {/*<img className="logo" src="./images/lof-logo.svg" alt="The Language of Flowers" title="The Language of Flowers" />*/}
          <header>
            {/*<svg className="doubleline-decoration" viewBox="0 0 1400 40" preserveAspectRatio="xMidYMid">
                <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
              </svg>*/}
              <hr />
            <h1>Bouquets full of hidden meaning.</h1>
           <hr className="reflected" />
              {/*<svg className="doubleline-decoration reflected" viewBox="0 0 1400 40">
                  <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                  <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
                </svg>*/}
            </header>
          <p>Whilst we don't like to gossip it would appear that there was a 'mistake' and the flowers from Lord George, meant for Lady Blanche, well they seem to have been sent to the divine Clara...With Penhaligon’s Floriography, indiscrete messages can be relayed between sweethearts, paramours and sugar peas - but what could be more (ah-em) improbable!</p>
          <p><strong>Choose the flowers and the recipient wisely</strong></p>
          <nav className="navigation">
            <Anchor cta="Create your own bouquet" step="forward" target="build-bouquet" />
          </nav>
        </div>
        </div>
        </div>
    )
  }




  /* Animation */
  animateIn(callback, delay) {
    // Show the spare logo in the backgtround component
    TweenMax.to("#lof-logo", 0.5, {autoAlpha:1, delay:0.5}); // eslint-disable-line
    // Open space for the logo
    TweenMax.to("#line-top > .segment", 0.8, { // eslint-disable-line
      drawSVG: "30% 100%",
      ease: "Power4.easeInOut"
    });

    TweenMax.set(".page > div", {  // eslint-disable-line
      scrollTo:0,
      delay:delay || 0
    });

    TweenMax.from(this.el, 0.5, { // eslint-disable-line
      autoAlpha:0,
      delay: delay || 0,
      ease: "Power4.easeInOut",
      onComplete:callback
    });
  }

  animateOut(callback) {
    TweenMax.to(this.el, 0.5, { // eslint-disable-line
      autoAlpha:0,
      ease: "Power4.easeInOut",
      onComplete:callback
    });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    // console.log("Description Will enter");
    this.animateIn(callback, 0.5);
  }

  componentDidEnter() {
    // console.log("Description Did enter");
  }

  componentWillAppear(callback) {
    // console.log("Description Will appear");
    this.animateIn(callback);
  }

  componentDidAppear() {
    // console.log("Description Did appear");
  }

  componentWillLeave(callback) {
    // console.log("Description Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    // console.log("Description Did leave");
  }

}
