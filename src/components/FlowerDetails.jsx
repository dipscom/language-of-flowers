import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import Button from './Button';
import Flower from './Flower';
export default class FlowerDetails extends Component {
  render() {
  	const disabled = (this.props.bouquetLength >= 3 ? false : true );
    return (
      <ul id="flower-details">
	      {
          <TransitionGroup>
            <Flower
              index={this.props.activeFlower}
              key={this.props.activeFlower}
              details={this.props.flowers[this.props.activeFlower]}/>
          </TransitionGroup>
	      }
	      <li>
	      	<Button disabled={disabled} cta={this.props.nextCta} step={this.props.nextStep} />
	      </li>
      </ul>
    )
  }




  /* Animation */
  componentWillAppear(callback) {
    console.log("FlowerDetails will appear")

    TweenMax.from("#flower-details", 0.5, { // eslint-disable-line
      autoAlpha:0,
      onComplete:callback
    })
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

}
