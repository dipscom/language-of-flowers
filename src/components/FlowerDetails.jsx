import React, { Component } from 'react';

export default class FlowerDetails extends Component{

  render() {
    return (
      <div
        id={this.props.activeFlower}
        key={this.props.activeFlower}
        className="flower-details"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <img
          src={'/images/flowers/' + this.props.activeFlower + '.png'}
          alt={this.props.flowers[this.props.activeFlower].name}
          title={this.props.flowers[this.props.activeFlower].name}
          />
        <div>
          <h1 className="word">{this.props.flowers[this.props.activeFlower].name}
          </h1>
          <svg className="doubleline-decoration" viewBox="0 0 1400 40">
            <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
            <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
          </svg>
          <h2 className="word">Meaning</h2>
          <strong className="word">{this.props.flowers[this.props.activeFlower].meaning}</strong>
          <p className="word">{this.props.flowers[this.props.activeFlower].description}</p>
        </div>
      </div>
    )
  }




  /* Animation */
  animateIn(callback) {

    let currentTarget = "#" + this.el.id;

    TweenMax.from(currentTarget + " img", 0.8, { // eslint-disable-line
      autoAlpha:0,
      ease: "Power4.easeInOut",
    });

    TweenMax.staggerFrom(currentTarget + " .word", 0.3, { // eslint-disable-line
      x: "-=30",
      ease: "Power2.easeOut"
    }, 0.05);

    callback();
  }

  animateOut(callback) {

    let currentTarget = "#" + this.el.id;

    TweenMax.to(currentTarget, 0.1, { // eslint-disable-line
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
