import React, { Component } from 'react';

export default class FlowerDetails extends Component{

  // constructor(props) {
  //   super(props);
  //
  //   // console.log("Constructor", this.props);
  //
  //   // this.el = "initial";
  // }

  render() {

    // console.log("Render FlowerDetails", this.props.activeFlower);

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
          <h1>{this.props.flowers[this.props.activeFlower].name}            <svg className="doubleline-decoration" viewBox="0 0 1400 40">
              <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
              <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
            </svg>
          </h1>
          <h2>Meaning</h2>
          <strong>{this.props.flowers[this.props.activeFlower].meaning}</strong>
          <p>{this.props.flowers[this.props.activeFlower].description}</p>
        </div>
      </div>
    )
  }




  /* Animation */
  animateIn(callback, delay) {

    let currentTarget = "#" + this.el.id;
    console.log("ANIMATE-IN", currentTarget);

    TweenMax.fromTo(currentTarget, 0.3, { // eslint-disable-line
      autoAlpha:0,
      delay: delay || 0,
    }, {
      autoAlpha: 1,
      ease: "Power4.easeInOut",
      // onComplete:callback,
      overwrite:"all"
    });

    callback();
  }

  animateOut(callback) {

    let currentTarget = "#" + this.el.id;
    console.log("ANIMATE-OUT", currentTarget);

    TweenMax.to(this.el, 0.3, { // eslint-disable-line
      autoAlpha:0,
      ease: "Power4.easeIn",
      onComplete:callback,
      overwrite:"all"
    });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    // console.log("FlowerDetails Will enter", this.el);
    this.animateIn(callback);
  }

  componentDidEnter() {
    // console.log("FlowerDetails Did enter", this.el);
  }

  componentWillAppear(callback) {
    // console.log("FlowerDetails Will appear");
    this.animateIn(callback);

  }

  componentDidAppear() {
    // console.log("FlowerDetails Did appear");
  }

  componentWillLeave(callback) {
    // console.log("FlowerDetails Will leave", this.el);
    this.animateOut(callback);
  }

  componentDidLeave() {
    // console.log("FlowerDetails Did leave", this.el);
  }

}
