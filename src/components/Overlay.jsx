import React, { Component } from 'react';

export default class Overlay extends Component {

  constructor(props) {
    super(props);
    // console.log("------------------");
    // console.log("Overlay constructor:");

    // this.tl = null;
    this.tl = new TimelineMax({paused:true}); // eslint-disable-line

    this.handleRender = this.handleRender.bind(this);

  }



  render() {

    console.log("----> Overlay render:");

    this.handleRender();

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

  handleRender() {
    console.log("handleRender");
    const thisHandler = this.handleAnimation;
    TweenMax.killDelayedCallsTo(thisHandler) // eslint-disable-line
    TweenMax.delayedCall(0.3, // eslint-disable-line
      thisHandler,
      [],
      this
    )
  }

  handleAnimation() {

    console.log("Overlay handleAnimation:", this.props.location.pathname, this.tl.isActive());
    switch (this.props.location.pathname) {
      case "build-bouquet":
      case "/build-bouquet":
      case "confirmation":
      case "/confirmation":
          this.tl.tweenTo("AnimateOut")
        break;

      // case "description":
      // case "/description":
      // case "success":
      // case "/success":
      // console.log("hold");
      // break;

      default:
      this.tl.tweenTo("Hold");

    }
    // if(this.props.location.pathname === "build-bouquet" && this.props.steps.current === 1) {
    //   console.log("AnimateOut");
    //   this.tl.play("AnimateOut");
    // } else if() {
    //   this.tl.play(0);
    // }
  }


  componentWillMount() {
    // No DOM manipulation should happen here.
    // console.log("Overlay will mount:");
  }

  componentDidMount() {
    // DOM manipulation should happen here.
    // console.log("Overlay did mount:");


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
      .from("#man", 1, {xPercent:10}, "People")
      .from("#lady", 1, {xPercent:-10}, "People")

      .add("Hold")
      .addPause()

      .to(['#flowersBottom','#flowersBottomRight','#flowersMidLeft','#flowersTopLeft','#flowersTopRight','#peacock','#stag',"#man","#lady"], 0.5, {autoAlpha:0})
      .add("AnimateOut")


  }
  componentWillUnmount() {
    // console.log("Overlay will unmount:");
  }


  /* Animation */
  fadeIn(el, opts = {xP:0, yP:0} ) {
    return TweenMax.from(el, 2, {xPercent:opts.xP, yPercent:opts.yP, autoAlpha:0, ease:Elastic.easeOut.config(0.4)}); // eslint-disable-line
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    // console.log("Overlay Will enter:");
  }

  componentDidEnter() {
    // console.log("Overlay Did enter:");
    // console.log("------------------");
  }

  componentWillAppear(callback) {
    // console.log("Overlay Will appear:");

    // this.handleAnimation();

  }

  componentDidAppear() {
    // console.log("Overlay Did appear:");
    // console.log("------------------");
  }

  componentWillLeave(callback) {
    // console.log("Overlay Will leave:");
    callback();
  }

  componentDidLeave() {
    // console.log("Overlay Did leave:");
    // console.log("------------------");
  }

}
