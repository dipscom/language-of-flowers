import React, { Component } from 'react';
import FadeOut from '../animation/FadeOut';


export default class HeroImage extends Component {
  render() {
    return (
    	<div id="hero-image">
    	  <header>
	      	<h1>Your Bouquet</h1>
          <hr />
	      </header>
      	<figure style={ {backgroundImage: 'url(/images/bouquets/' + [...this.props.bouquet].sort().toString().replace(/,/g, '_') + '.png)'} }></figure>
      </div>
    )
  }




	/* Animation */
	componentWillAppear(callback) {
		// console.log("HeroImage will appear")
    // Intro animation is in BouquetDetails.jsx
    callback();
	}
	componentWillEnter(callback) {
		// console.log("HeroImage will enter");
    // Intro animation is in BouquetDetails.jsx
    callback();
	}
	componentDidEnter() {
		// console.log("HeroImage did enter")
	}
	componentDidAppear() {
		// console.log("HeroImage did appear")
	}
  componentWillLeave(callback) {
    // console.log("HeroImage will leave");
    FadeOut('hero-image', callback);
  }
}
