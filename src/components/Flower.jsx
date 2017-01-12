import React, { Component } from 'react';

export default class Flower extends Component{
  render() {
    return (
      <div
        id="flower-details"
        key="flowerDetails"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <img src={'/images/flowers/' + this.props.activeFlower + '.png'} alt={this.props.flowers[this.props.activeFlower].name} title={this.props.flowers[this.props.activeFlower].name} />
        <div>
          <h1>{this.props.flowers[this.props.activeFlower].name}</h1>
          <strong>{this.props.flowers[this.props.activeFlower].meaning}</strong>
          <p>{this.props.flowers[this.props.activeFlower].description}</p>
        </div>
      </div>
    )
  }




  /* Animation */
  animateIn(callback, delay) {
    TweenMax.from(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      delay: delay || 0,
      onComplete:callback
    });
  }

  animateOut(callback) {
    TweenMax.to(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      ease: "Power4.easeIn",
      onComplete:callback
    });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    console.log("Flower Will enter");
    this.animateIn(callback, 1);
  }

  componentDidEnter() {
    console.log("Flower Did enter");
  }

  componentWillAppear(callback) {
    console.log("Flower Will appear");
    this.animateIn(callback, 1);
  }

  componentDidAppear() {
    console.log("Flower Did appear");
  }

  componentWillLeave(callback) {
    console.log("Flower Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    console.log("Flower Did leave");
  }

}
