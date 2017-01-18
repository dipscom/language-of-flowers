import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import HeroImage from './HeroImage';
import BouquetDetails from './BouquetDetails';
import FlowerSelect from './FlowerSelect';
import FlowerDetails from './FlowerDetails';
import PersonDetails from './PersonDetails';
import FormNavigation from './FormNavigation';

const initialState = {
	activeFlower: null,
  step: 4
};

export default class Form extends Component {
  constructor(){
    super();
    this.state = initialState;
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.updateActiveFlower = this.updateActiveFlower.bind(this);
  }
  componentWillMount(){
    if (!this.state.activeFlower) {
      this.setState({
        activeFlower: Object.keys(this.props.flowers)[0]
      });
    }
  }
  updateActiveFlower(key) {
    if (this.state.activeFlower !== key) {
      this.setState({
        activeFlower: key
      })
    }
  }
  nextStep() {
    this.setState({
      step : this.state.step + 1
    });
  }
  prevStep() {
    this.setState({
      step : this.state.step - 1
    });
  }
  formStepLeft() {
  	switch (this.state.step) {
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
      					step={this.state.step} />
  	}
	}
	formStepRight() {
  	switch (this.state.step) {
      case 1:
        return <FlowerDetails 
        				key="flower-details"
        				bouquetLength={this.props.bouquet.length}
        				flowers={this.props.flowers}
        				activeFlower={this.state.activeFlower}
        				nextCta="View your bouquet"
        				nextStep={this.nextStep} />
      case 2:
        return <BouquetDetails
        				key="bouquet-details"
        				bouquet={this.props.bouquet}
        				flowers={this.props.flowers}
        				prevCta="Change bouquet"
        				nextCta="Their details"
        				nextStep={this.nextStep}
        				prevStep={this.prevStep} />
      case 3:
        return <PersonDetails
        				key="recipient"
        				index="recipient"
        				recipient={this.props.recipient}
        				updateField={this.props.updateField}
        				heading="Their Detials"
        				prevCta="View bouquet"
        				nextCta="Your details"
        				nextStep={this.nextStep}
        				prevStep={this.prevStep} />

      case 4:
        return <PersonDetails
        				key="sender"
        				index="sender"
        				sender={this.props.sender}
        				updateField={this.props.updateField}
        				heading="Your Detials"
        				prevCta="Their Details"
        				nextCta="Confirm & send"
        				prevStep={this.prevStep}
        				nextStep="confirmation" />
      default: 
      	return <BouquetDetails
        				key="bouquet-details"
        				bouquet={this.props.bouquet}
        				flowers={this.props.flowers}
        				nextCta="Their details"
        				nextStep="share"
        				 />
  	}
	}
  render() { 
    return (
      <div id="form">
      	<div>
      		<div>
		      	<TransitionGroup component="div" className="column">
		      		{this.formStepLeft()}
		      	</TransitionGroup>
		      	<span id="divider"></span>
		      	<TransitionGroup component="div" className="column">
		      		{this.formStepRight()}
		      	</TransitionGroup>
		      	<FormNavigation />
		      </div>
	      </div>
      </div> 
    )
  }
}