import React, { Component } from 'react';

export default class HeroImage extends Component {
  render() {
  	let classes = '';
  	if (this.props.step > 2) {
  		classes += 'hide-portrait';
  	}
    return (
    	<div id="hero-image" className={classes}>
    	  <header>
	      	<h1>Your Bouquet</h1>
	      	<svg className="doubleline-decoration" viewBox="0 0 1400 40">
            <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
            <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
          </svg>
	      </header>
      	<figure style={ {backgroundImage: 'url(/images/bouquets/' + [...this.props.bouquet].sort().toString().replace(/,/g, '_') + '.png)'} }></figure>
      </div>
    )
  }




	/* Animation */
	componentWillAppear(callback) {
		// console.log("HeroImage will appear")
		callback();
	}
	componentWillEnter(callback) {
		// console.log("HeroImage will enter");
    TweenMax.from("#hero-image", 0.5, { // eslint-disable-line
      autoAlpha:0,
      delay: 0.5,
      onComplete:callback
    })

	}
	componentDidEnter() {
		// console.log("HeroImage did enter")
	}
	componentDidAppear() {
		// console.log("HeroImage did appear")
	}
  componentWillLeave(callback) {
    // console.log("HeroImage will leave");
    TweenMax.set("#hero-image", { // eslint-disable-line
      position:"absolute"
    });
    TweenMax.to("#hero-image", 0.5, { // eslint-disable-line
      autoAlpha:0,
      onComplete:callback
    });
  }
}
