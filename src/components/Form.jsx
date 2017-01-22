import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import HeroImage from './HeroImage';
import BouquetDetails from './BouquetDetails';
import FlowerSelect from './FlowerSelect';
import FlowerDetails from './FlowerDetails';
import PersonDetails from './PersonDetails';
// import NavLink from './NavLink';
import OverlayIn from '../animation/OverlayIn';
import OverlayOut from '../animation/OverlayOut';

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
        				heading="Their Detials"
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
        				heading="Your Detials"
        				prevCta="Their Details"
        				nextCta="Confirm & send"
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
        console.log('current nav' + 1);
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
	componentWillAppear(callback) {
		// console.log("Form will enter")
		TweenMax.from("#form", 0.5, { // eslint-disable-line
		  autoAlpha:0,
		  delay: 0.5,
		  onComplete:callback
		});

		OverlayOut();
	}

	componentWillEnter(callback) {
		// console.log("Form will enter")
		TweenMax.from("#form", 0.5, { // eslint-disable-line
		  autoAlpha:0,
		  delay: 0.5,
		  onComplete:callback
		});

		OverlayOut();
	}
	componentDidEnter() {
		// console.log("Form did enter")
	}

	componentWillLeave(callback) {
		console.log("Form Will leave");
		TweenMax.to("#form", 0.5, { // eslint-disable-line
		  autoAlpha:0,
		  onComplete:callback
		});

		OverlayIn();
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
    // console.log(this.latestKnownScrollY);

		this.logoTl.progress(this.latestKnownScrollY/100)

    this.ticking = false;
  }


}
