import React, { Component } from 'react';
import Button from './Button';
import Flower from './Flower';
export default class FlowerDetails extends Component {
  componentWillAppear(callback) {
		console.log("FlowerDetails will appear")
		callback();
	}
	componentWillEnter(callback) {
		console.log("FlowerDetails will enter")
		callback();
	}
	componentDidEnter() {
		console.log("FlowerDetails did enter")
	}
	componentDidAppear() {
		console.log("FlowerDetails did appear")
	}
  render() { 
  	const disabled = (this.props.bouquetLength >= 3 ? false : true )
    return (
      <ul id="flower-details">
	      {<Flower
	      	index={this.props.activeFlower}
	      	details={this.props.flowers[this.props.activeFlower]}/>
	      }
	      <li>
	      	<Button disabled={disabled} cta={this.props.nextCta} step={this.props.nextStep} />
	      </li>
      </ul>
    )
  }
}