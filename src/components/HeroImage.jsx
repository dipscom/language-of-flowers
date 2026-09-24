import React, { Component } from 'react';
import FadeOut from '../animation/FadeOut';


export default class HeroImage extends Component {
  render() {
    return (
    	<div id="hero-image">
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
	animateAppear(callback) {
    // Intro animation is in BouquetDetails.jsx
    callback();
	}
	animateEnter(callback) {
    // Intro animation is in BouquetDetails.jsx
    callback();
	}
  animateLeave(callback) {
    FadeOut('hero-image', callback);
  }
}
