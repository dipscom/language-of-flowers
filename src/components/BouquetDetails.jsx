import React, { Component } from 'react';
import Button from './Button';
import Flower from './Flower';

export default class BouquetDetails extends Component {
  componentWillAppear(callback) {
		console.log("BouquetDetails will appear")
		callback();
	}
	componentWillEnter(callback) {
		console.log("BouquetDetails will enter")
		callback();
	}
	componentDidEnter() {
		console.log("BouquetDetails did enter")
	}
	componentDidAppear() {
		console.log("BouquetDetails did appear")
	}
  render() { 
    return (
      <div id="bouquet-details">
      	<header>
	      	<h1>Your Bouquet</h1>
	      </header>
	      <ol className="bouquet-list">
	      	{this.props.bouquet
	      		.map(key => 
	      			<Flower
	      				key={key}
	      				index={key}
	      				details={this.props.flowers[key]} />)
	      	}
	      </ol>
	      <Button cta={this.props.prevCta} step={this.props.prevStep} />
	      <Button cta={this.props.nextCta} step={this.props.nextStep} />
	    </div> 
    )
  }
}