import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import HeroImage from './HeroImage';
import BouquetDetails from './BouquetDetails';
import FlowerSelect from './FlowerSelect';
import FlowerDetails from './FlowerDetails';
import PersonDetails from './PersonDetails';
// import NavLink from './NavLink';
import OverlayOut from '../animation/OverlayOut';
import CloudsLoop from '../animation/CloudsLoop';
import FadeIn from '../animation/FadeIn';
import FadeOut from '../animation/FadeOut';


const initialState = {
	activeFlower: null,
};

export default class Form extends Component {
  constructor(){
    super();
    this.state = initialState;
    this.updateActiveFlower = this.updateActiveFlower.bind(this);

		this.latestKnownScrollY = 0;
		this.ticking = false;
		this.onScroll = this.onScroll.bind(this);
		this.update = this.update.bind(this);
		this.logoTl = null;

  }
  componentWillMount(){
    if (!this.state.activeFlower) {
      this.setState({
        activeFlower: Object.keys(this.props.flowers)[0]
      });
    }
  }
	componentDidMount() {
		// Tween to control the opacity of LOF logo when scrolling the viewport
		this.logoTl = TweenMax.to("#lof-logo", 1, {autoAlpha:0, paused:true, ease:"Linear.easeNone"}); // eslint-disable-line
	}
  updateActiveFlower(key) {
    if (this.state.activeFlower !== key) {
      this.setState({
        activeFlower: key
      })
    }
  }
  formStepLeft() {
  	switch (this.props.steps.current) {
      case 1:
      	return <FlowerSelect
      					key="flower-select"
      					bouquet={this.props.bouquet}
      					flowers={this.props.flowers}
      					selectFlower={this.props.selectFlower}
      					updateActiveFlower={this.updateActiveFlower} />
      default:
      	return <HeroImage
      					key="hero-image"
      					bouquet={this.props.bouquet}
      					step={this.props.steps.current} />
  	}
	}
	formStepRight() {
  	switch (this.props.steps.current) {
      case 1:
        return <FlowerDetails
        				key="flower-details"
        				bouquetLength={this.props.bouquet.length}
        				flowers={this.props.flowers}
        				activeFlower={this.state.activeFlower}
        				nextCta="View your bouquet"
        				nextStep={this.props.nextStep} />
      case 2:
        return <BouquetDetails
        				key="bouquet-details"
        				bouquet={this.props.bouquet}
        				flowers={this.props.flowers}
        				prevCta="Change bouquet"
        				nextCta="Their details"
        				nextStep={this.props.nextStep}
        				prevStep={this.props.prevStep}
                step={this.props.steps.current} />
      case 3:
        return <PersonDetails
        				key="recipient"
        				index="recipient"
        				recipient={this.props.recipient}
        				updateField={this.props.updateField}
        				heading="Their Details"
        				prevCta="View bouquet"
        				nextCta="Your details"
        				nextStep={this.props.nextStep}
        				prevStep={this.props.prevStep} />

      case 4:
        return <PersonDetails
        				key="sender"
        				index="sender"
        				sender={this.props.sender}
        				updateField={this.props.updateField}
        				heading="Your Details"
        				prevCta="Their Details"
        				nextCta="Confirm"
        				prevStep={this.props.prevStep}
        				nextStep="confirmation" />
      default:
      	return <BouquetDetails
        				key="bouquet-details"
        				bouquet={this.props.bouquet}
        				flowers={this.props.flowers}
        				nextCta="Win Penhaligon's Portraits"
                step={this.props.steps.current}
        				/>
  	}
	}
  render() {
    let diamonds = [], classes = null;
    for (let i = 1; i <= this.props.steps.total; i++) {
      if (i === this.props.steps.current) {
        classes = 'current';
      } else if (i > this.props.steps.current) {
        classes = 'disabled';
      }
      diamonds.push(<span
          key={i}
          className={classes}
          onClick={() => {this.props.updateStep(i)}}
        ></span>);
    }
    return (
      <div id="form">
      	<div id="scroller" onScroll={this.onScroll}>
      		<div>
		      	<TransitionGroup component="div" className="column">
		      		{this.formStepLeft()}
		      	</TransitionGroup>
		      	<span id="divider"></span>
		      	<TransitionGroup component="div" className="column">
		      		{this.formStepRight()}
		      	</TransitionGroup>
		      	<nav id="form-navigation">
		      		{diamonds}
		      	</nav>
		      </div>
	      </div>
      </div>
    )
  }




	/* Animation */
	resizeLOF(down) {
		let tl = new TimelineMax(); // eslint-disable-line

		// Make sure the logo is centered on its x-axis
		tl.set("#lof-logo", {xPercent:-50});

		if(window.innerHeight > window.innerWidth){
			tl.to("#lof-logo", 0.8, {
				scale:0.7,
				yPercent:-30,
				ease: "Power2.easeInOut"
			}, 0);
			// Open the space for the logo
			tl.to("#line-top > .segment", 0.8, {
				drawSVG: "30% 100%",
				ease: "Power2.easeInOut"
			}, 0);
		} else {
			tl.to("#lof-logo", 0.8, {
				scale:0.95,
				yPercent:-45,
				ease: "Power2.easeInOut"
			}, 0);
			// Open the space for the logo
			tl.to("#line-top > .segment", 0.8, {
				drawSVG: "30% 100%",
				ease: "Power2.easeInOut"
			}, 0);
		}
		return tl;
	}

	AnimateIn(callback, delay) {
		let tl = new TimelineMax({delay:delay || 0, onComplete:callback}); // eslint-disable-line

		tl.add(OverlayOut())
			.add(this.resizeLOF(), 0)
			.add(FadeIn('form'))

	}

	componentWillAppear(callback) {
		// console.log("Form will enter")
		this.AnimateIn(callback);

		// Clouds infinite loop
		CloudsLoop();

	}

	componentWillEnter(callback) {
		// console.log("Form will enter")
		this.AnimateIn(callback, 0.5);
	}

	componentDidEnter() {
		// console.log("Form did enter")
	}

	componentWillLeave(callback) {
		// console.log("Form Will leave");
		FadeOut('form', callback);
	}

	onScroll() {
		let scrollY = document.getElementById('scroller').scrollTop;
    this.latestKnownScrollY = scrollY;
		this.requestTick();
  }

  requestTick() {
    if(!this.ticking) {
      requestAnimationFrame(this.update);
    }
  }

  update() {
		this.logoTl.progress(this.latestKnownScrollY/100)
    this.ticking = false;
  }


}
