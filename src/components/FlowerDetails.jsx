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
    return (
      <ul id="flower-details">
	      {<Flower
	      	index={this.props.activeFlower}
	      	details={this.props.flowers[this.props.activeFlower]}/>
	      }
	      <Button cta={this.props.nextCta} step={this.props.nextStep} />
      </ul>
    )
  }
}