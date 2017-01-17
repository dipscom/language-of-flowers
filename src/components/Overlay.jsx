import React, { Component } from 'react';

export default class Overlay extends Component {

  constructor(props) {
    super(props);

    this.tl = null;

  }


  render() {

    switch (this.props.location.pathname) {
      case "/create-bouquet":
      case "/view-bouquet":
      case "/recipient":
      case "/sender":
        if(this.tl) {
          this.tl.timeScale(3.5)
          this.tl.reverse();
        }
        break;

      default:
      if(this.tl) {
        this.tl.timeScale(1)
        this.tl.play();
      }

    }

    return (
      <div
        id="overlay"
        key="overlay"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >

        <img id="man" src="/images/overlay/man.png" alt="" />

        <img id="flowersBottomRight" src="/images/overlay/flowers-bottomright.png" alt="" className="flowers bottom right" />

        <img id="flowersMidLeft" src="/images/overlay/flowers-midleft.png" alt="" className="flowers mid left" />

        <img id="lady"src="/images/overlay/lady.png" alt=""  />

        <img id="flowersBottom" className="flowers bottom left" src="/images/overlay/flowers-bottom.png" alt="" />

        <img id="flowersTopLeft" src="/images/overlay/flowers-topleft.png" alt="" className="flowers top left" />

        <img id="flowersTopRight" src="/images/overlay/flowers-topright.png" alt="" className="flowers top right" />

        <img id="peacock" src="/images/overlay/peacock.png" alt="" />
        <img id="stag" src="/images/overlay/stag.png" alt="" />

      </div>
    )
  }




  /* Animation */
  fadeIn(el, opts = {xP:0, yP:0} ) {
    return TweenMax.from(el, 2, {xPercent:opts.xP, yPercent:opts.yP, autoAlpha:0, ease:"Power2.easeOut"}); // eslint-disable-line
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    // console.log("Overlay Will enter", this.el);
  }

  componentDidEnter() {
    // console.log("Overlay Did enter", this.el);
  }

  componentWillAppear(callback) {
    // console.log("Overlay Will appear");

    this.tl = new TimelineMax({onComplete:callback,delay:2.5}); // eslint-disable-line

    // We're using normal CSS selectors because we know for a fact that this component will not be unmounted and/or changed at any time during the existence of this webapp
    this.tl
      .add(this.fadeIn('#flowersBottom', {xP:0, yP:10}), 0)
      .add(this.fadeIn('#flowersBottomRight', {xP:30, yP:10}), 0.1)
      .add(this.fadeIn('#flowersMidLeft', {xP:-10, yP:1}), 0.13)
      .add(this.fadeIn('#flowersTopLeft', {xP:-10, yP:-10}), 0.2)
      .add(this.fadeIn('#flowersTopRight', {xP:10, yP:-10}), 0.23)
      .add(this.fadeIn('#peacock', {xP:-5, yP:10}), 0.3)
      .add(this.fadeIn('#stag', {xP:5, yP:10}), 0.3)
      .add("People", 1.5)
      .from(["#man","#lady"], 1, {autoAlpha:0}, "People")

      // .add("EndIntro")

      // .addPause()
      // .add("MoveOut", "+=0.1")
      // .to(['#flowersBottom','#flowersBottomRight','#flowersMidLeft','#flowersTopLeft','#flowersTopRight','#peacock','#stag',"#man","#lady"], 0.3, {autoAlpha:0})

  }

  componentDidAppear(callback) {
    // console.log("Overlay Did appear");
  }

  componentWillLeave(callback) {
    // console.log("Overlay Will leave", this.el);
  }

  componentDidLeave() {
    // console.log("Overlay Did leave", this.el);
  }

}
