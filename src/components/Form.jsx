import React, { Component } from "react";
import { gsap } from "gsap";
import AnimatedSwitch from "./AnimatedSwitch";
import HeroImage from "./HeroImage";
import BouquetDetails from "./BouquetDetails";
import FlowerSelect from "./FlowerSelect";
import FlowerDetails from "./FlowerDetails";
import PersonDetails from "./PersonDetails";
import OverlayOut from "../animation/OverlayOut";
import CloudsLoop from "../animation/CloudsLoop";
import FadeIn from "../animation/FadeIn";
import FadeOut from "../animation/FadeOut";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFlower: Object.keys(props.flowers)[0],
    };
    this.updateActiveFlower = this.updateActiveFlower.bind(this);

    this.latestKnownScrollY = 0;
    this.ticking = false;
    this.onScroll = this.onScroll.bind(this);
    this.update = this.update.bind(this);
    this.logoTl = null;
  }
  componentDidMount() {
    // Tween to control the opacity of LOF logo when scrolling the viewport
    this.logoTl = gsap.to("#lof-logo", {
      autoAlpha: 0,
      paused: true,
      ease: "none",
      duration: 1,
    });
  }
  updateActiveFlower(key) {
    if (this.state.activeFlower !== key) {
      this.setState({
        activeFlower: key,
      });
    }
  }
  formStepLeft() {
    switch (this.props.steps.current) {
      case 1:
        return {
          component: FlowerSelect,
          key: "flower-select",
          props: {
            bouquet: this.props.bouquet,
            flowers: this.props.flowers,
            selectFlower: this.props.selectFlower,
            updateActiveFlower: this.updateActiveFlower,
            enableButton: this.props.enableButton,
          },
        };
      default:
        return {
          component: HeroImage,
          key: "hero-image",
          props: {
            bouquet: this.props.bouquet,
            step: this.props.steps.current,
          },
        };
    }
  }
  formStepRight() {
    switch (this.props.steps.current) {
      case 1:
        return {
          component: FlowerDetails,
          key: "flower-details",
          props: {
            bouquetLength: this.props.bouquet.length,
            flowers: this.props.flowers,
            activeFlower: this.state.activeFlower,
            nextCta: "View your bouquet",
            nextStep: this.props.nextStep,
          },
        };
      case 2:
        return {
          component: BouquetDetails,
          key: "bouquet-details",
          props: {
            bouquet: this.props.bouquet,
            flowers: this.props.flowers,
            prevCta: "Change bouquet",
            nextCta: "Their details",
            nextStep: this.props.nextStep,
            prevStep: this.props.prevStep,
            step: this.props.steps.current,
            enableButton: this.props.enableButton,
          },
        };
      case 3:
        return {
          component: PersonDetails,
          key: "recipient",
          props: {
            index: "recipient",
            recipient: this.props.recipient,
            updateField: this.props.updateField,
            heading: "Their details",
            prevCta: "View bouquet",
            nextCta: "Your details",
            nextStep: this.props.nextStep,
            prevStep: this.props.prevStep,
            enableButton: this.props.enableButton,
          },
        };

      case 4:
        return {
          component: PersonDetails,
          key: "sender",
          props: {
            index: "sender",
            sender: this.props.sender,
            updateField: this.props.updateField,
            heading: "Your details",
            prevCta: "Their details",
            nextCta: "Confirm",
            prevStep: this.props.prevStep,
            nextStep: "confirmation",
            enableButton: this.props.enableButton,
          },
        };
      default:
        return {
          component: BouquetDetails,
          key: "bouquet-details",
          props: {
            bouquet: this.props.bouquet,
            flowers: this.props.flowers,
            nextCta: "Win Penhaligon's Portraits",
            step: this.props.steps.current,
          },
        };
    }
  }
  render() {
    const left = this.formStepLeft();
    const right = this.formStepRight();
    let diamonds = [],
      classes = null,
      disabled = false;
    for (let i = 1; i <= this.props.steps.total; i++) {
      if (i === this.props.steps.current) {
        classes = "current";
      } else if (i > this.props.steps.current) {
        disabled = true;
        classes = null;
      }
      if (this.props.navigation.disabled) {
        disabled = true;
      }
      diamonds.push(
        <button
          key={i}
          className={classes}
          disabled={disabled}
          onClick={() => {
            this.props.updateStep(i);
          }}
        ></button>,
      );
    }
    return (
      <div id="form">
        <div id="scroller" onScroll={this.onScroll}>
          <div>
            <AnimatedSwitch
              component={left.component}
              componentKey={left.key}
              wrapperClassName="column"
              {...left.props}
            />
            <span id="divider"></span>
            <AnimatedSwitch
              component={right.component}
              componentKey={right.key}
              wrapperClassName="column"
              {...right.props}
            />
          </div>
        </div>
        <nav id="form-navigation">
          <div>{diamonds}</div>
        </nav>
      </div>
    );
  }

  /* Animation */
  resizeLOF(down) {
    let tl = gsap.timeline();

    // Make sure the logo is centered on its x-axis
    tl.set("#lof-logo", { xPercent: -50 });

    if (window.innerHeight > window.innerWidth) {
      tl.to(
        "#lof-logo",
        {
          scale: 0.7,
          yPercent: -30,
          ease: "power2.inOut",
          duration: 0.8,
        },
        0,
      );
      // Open the space for the logo
      tl.to(
        "#line-top > .segment",
        {
          drawSVG: "30% 100%",
          ease: "power2.inOut",
          duration: 0.8,
        },
        0,
      );
    } else {
      tl.to(
        "#lof-logo",
        {
          scale: 0.8,
          yPercent: -45,
          ease: "power2.inOut",
          duration: 0.8,
        },
        0,
      );
      // Open the space for the logo
      tl.to(
        "#line-top > .segment",
        {
          drawSVG: "30% 100%",
          ease: "power2.inOut",
          duration: 0.8,
        },
        0,
      );
    }
    return tl;
  }

  AnimateIn(callback, delay) {
    let tl = gsap.timeline({ delay: delay || 0, onComplete: callback });

    tl.add(OverlayOut())
      .add(this.resizeLOF(), 0)
      .add(FadeIn("form"))
      .call(this.props.enableButton.bind(this), null, "+=0");
  }

  animateAppear(callback) {
    this.AnimateIn(callback);

    // Clouds infinite loop
    CloudsLoop();
  }

  animateEnter(callback) {
    this.AnimateIn(callback, 0.5);
  }

  animateLeave(callback) {
    FadeOut("form", callback);
  }

  onScroll() {
    let scrollY = document.getElementById("scroller").scrollTop;
    this.latestKnownScrollY = scrollY;
    this.requestTick();
  }

  requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(this.update);
    }
  }

  update() {
    this.logoTl.progress(this.latestKnownScrollY / 100);
    this.ticking = false;
  }
}
