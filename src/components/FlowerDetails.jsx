import React, { Component } from 'react';

export default class FlowerDetails extends Component{
  render() {

    console.log("Change FlowerDetails");

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
        <img src={'/images/flowers/' + this.props.activeFlower + '.png'} alt={this.props.flowers[this.props.activeFlower].name} title={this.props.flowers[this.props.activeFlower].name}
          />
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
    // console.log("FlowerDetails Will enter");
    this.animateIn(callback);
  }

  componentDidEnter() {
    // console.log("FlowerDetails Did enter");
  }

  componentWillAppear(callback) {
    // console.log("FlowerDetails Will appear");
    this.animateIn(callback);

  }

  componentDidAppear() {
    // console.log("FlowerDetails Did appear");
  }

  componentWillLeave(callback) {
    // console.log("FlowerDetails Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    // console.log("FlowerDetails Did leave");
  }

}
