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
    return (
      <figure style={ {backgroundImage: 'url(/images/bouquets/' + [...this.props.bouquet].sort().toString().replace(/,/g, '_') + '.png)',
      width: '100px', height: '100px', backgroundSize: 'contain'} }></figure>
    )
  }
}