import React, { Component } from 'react';

export default class HeroImage extends Component {
	componentWillAppear(callback) {
		console.log("HeroImage will appear")
		callback();
	}
	componentWillEnter(callback) {
		console.log("HeroImage will enter")
		callback();
	}
	componentDidEnter() {
		console.log("HeroImage did enter")
	}
	componentDidAppear() {
		console.log("HeroImage did appear")
	}
  render() { 
  	let classes = '';
  	if (this.props.step >= 3) {
  		classes += 'hide-portrait';
  	}
    return (
    	<div id="hero-image" className={classes}>
    	  <header>
	      	<h1>Your Bouquet</h1>
	      </header>
      	<figure style={ {backgroundImage: 'url(/images/bouquets/' + [...this.props.bouquet].sort().toString().replace(/,/g, '_') + '.png)'} }></figure>
      </div>
    )
  }
}