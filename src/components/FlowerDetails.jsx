import React, { Component, createRef } from 'react';
import { gsap } from 'gsap';
import AnimatedSwitch from './AnimatedSwitch';
import Button from './Button';
import Flower from './Flower';
export default class FlowerDetails extends Component {
  listRef = createRef();

  render() {
  	const disabled = (this.props.bouquetLength >= 3 ? false : true );
    return (
      <div  id="flower-details">
        <ul ref={this.listRef}>
          <AnimatedSwitch
            component={Flower}
            componentKey={this.props.activeFlower}
            sharedNodeRef={this.listRef}
            index={this.props.activeFlower}
            details={this.props.flowers[this.props.activeFlower]}
          />
        </ul>
        <Button className="button" cta={this.props.nextCta} disabled={disabled} step={this.props.nextStep} />
      </div>
    )
  }




  /* Animation */
  animateAppear(callback) {
    callback();
  }
  animateEnter(callback) {
    gsap.set("#flower-details", {
      position:"absolute"
    });

    gsap.from("#flower-details", {
      autoAlpha:0,
      delay: 0.5,
      duration: 0.5,
      onStart:function () {
        gsap.set("#flower-details", {position:"relative"});

      }
    })
    callback();
  }
  animateLeave(callback) {
    gsap.to("#flower-details", {
      autoAlpha:0,
      duration: 0.5,
      onComplete:callback
    });
  }


}
