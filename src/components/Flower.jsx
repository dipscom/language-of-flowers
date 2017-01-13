import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import FlowerDetails from './FlowerDetails'


export default class Flower extends Component{
  render() {

    // console.log("Render Flower");

    return (
      <TransitionGroup
        id="flowersDetails"
        component="div"
      >
        <FlowerDetails
          activeFlower={this.props.activeFlower}
          flowers={this.props.flowers}
          key="flowersDetails"
        />
      </TransitionGroup>
    )
  }




  // /* Animation */
  // animateIn(callback, delay) {
  //   TweenMax.from("#flowersDetails", 1, { // eslint-disable-line
  //     autoAlpha:0,
  //     delay: delay || 0,
  //     onComplete:callback
  //   });
  // }
  //
  // animateOut(callback) {
  //   TweenMax.to("#flowersDetails", 1, { // eslint-disable-line
  //     autoAlpha:0,
  //     ease: "Power4.easeIn",
  //     onComplete:callback
  //   });
  // }
  //
  //
  // /* React Animation Callbacks */
  // componentWillEnter(callback) {
  //   console.log("Flower Will enter");
  //   // this.animateIn(callback, 1);
  // }
  //
  // componentDidEnter() {
  //   console.log("Flower Did enter");
  // }
  //
  // componentWillAppear(callback) {
  //   console.log("Flower Will appear");
  //   this.animateIn(callback, 1);
  // }
  //
  // componentDidAppear() {
  //   console.log("Flower Did appear");
  // }
  //
  // componentWillLeave(callback) {
  //   console.log("Flower Will leave");
  //   this.animateOut(callback);
  // }
  //
  // componentDidLeave() {
  //   console.log("Flower Did leave");
  // }

}
