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
	      	{/*<svg className="doubleline-decoration" viewBox="0 0 1400 40">
            <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
            <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
          </svg>*/}
          <hr />
	      </header>
      	<figure style={ {backgroundImage: 'url(/images/bouquets/' + [...this.props.bouquet].sort().toString().replace(/,/g, '_') + '.png)'} }></figure>
      </div>
    )
  }




	/* Animation */
  animateIn(callback, delay) {
    var tl = new TimelineMax(); // eslint-disable-line

    tl.from("#hero-image", 1.5, {
      autoAlpha: 0,
      delay: delay || 0,
      scale: 1.05,
      ease: "Power4.easeOut",
      onComplete:callback
    });
    tl.add("Details", "-=1.5")
    tl.from("#bouquet-details header", 1.5, {
      autoAlpha: 0,
      ease: "Power4.easeInOut"
    }, "Details+=0.25")
    tl.staggerFrom("#bouquet-details li", 1.5, {
      autoAlpha: 0,
      ease: "Power4.easeInOut"
    }, 0.25, "Details+=0.5")
    tl.staggerFrom(["#bouquet-details button"], 1.5, {
      autoAlpha: 0,
      ease: "Power4.easeInOut"
    }, 0.25, "Details+=0.75")




    return tl;
  }

	componentWillAppear(callback) {
		// console.log("HeroImage will appear")
    this.animateIn(callback, 0.5)
	}
	componentWillEnter(callback) {
		// console.log("HeroImage will enter");
    this.animateIn(callback, 0.5)
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
