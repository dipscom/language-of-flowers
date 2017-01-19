import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import Button from './Button';
import Flower from './Flower';
export default class FlowerDetails extends Component {
  render() {
  	const disabled = (this.props.bouquetLength >= 3 ? false : true );
    return (
      <div  id="flower-details">
        <ul>
  	      {
            <TransitionGroup>
              <Flower
                index={this.props.activeFlower}
                key={this.props.activeFlower}
                details={this.props.flowers[this.props.activeFlower]}/>
            </TransitionGroup>
  	      }
        </ul>
        <Button className="button" cta={this.props.nextCta} disabled={disabled} step={this.props.nextStep} />
      </div>
    )
  }




  /* Animation */
  componentWillAppear(callback) {
    // console.log("FlowerDetails will appear")
    callback();
  }
  componentWillEnter(callback) {
    // console.log("FlowerDetails will enter")
    TweenMax.from("#flower-details", 0.5, { // eslint-disable-line
      autoAlpha:0,
      delay: 0.5,
    })
    callback();
  }
  componentDidEnter() {
    // console.log("FlowerDetails did enter")
  }
  componentDidAppear() {
    // console.log("FlowerDetails did appear")
  }
  componentWillLeave(callback) {
    // console.log("FlowerDetails will leave");
    TweenMax.set("#flower-details", { // eslint-disable-line
      position:"absolute"
    });
    TweenMax.to("#flower-details", 0.5, { // eslint-disable-line
      autoAlpha:0,
      onComplete:callback
    });
  }


}
