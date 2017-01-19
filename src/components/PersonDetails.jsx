import React, { Component } from 'react';
import Button from './Button';
import Anchor from './Anchor';

export default class PersonDetails extends Component {
	constructor(){
    super();
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);

  }
  componentWillAppear(callback) {
		console.log("PersonInput will appear")
		callback();
	}
	componentWillEnter(callback) {
		console.log("PersonInput will enter")
		callback();
	}
	componentDidEnter() {
		console.log("PersonInput did enter")
	}
	componentDidAppear() {
		console.log("PersonInput did appear")
	}
	capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {

  	let disabled;

  	if (typeof this.props.nextStep === 'string') {
  		if(this.props[this.props.index].name !== '' && this.props[this.props.index].valid) {
  		} else {
  			disabled = 'disabled';
  		}	 
  	} else {
  		if (this.props[this.props.index].name !== '' && this.props[this.props.index].valid) {
  		} else { 
  			disabled = true
  		}
  	}
    return (
    	<div className="person-details">
      <form>
    		<header>
	    		<h1>{this.props.heading}</h1>
	    		<svg className="doubleline-decoration" viewBox="0 0 1400 40">
            <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
            <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
          </svg>
	    	</header>
	    	<label htmlFor="name">{this.capitalizeFirstLetter(this.props.index)} first name</label>
	    	<input type="text" id="name" className={this.props.index} name="name" value={this.props[this.props.index].name} placeholder="Name" required onChange={(e) => this.props.updateField(e)} />
	    	<label htmlFor="email">{this.capitalizeFirstLetter(this.props.index)} email</label>
	    	<input type="email" id="email" className={this.props.index} name="email" value={this.props[this.props.index].email} placeholder="Email" required onChange={(e) => this.props.updateField(e)} />
	    	<Button className="back-button" cta={this.props.prevCta} step={this.props.prevStep} />
    	</form>
      { typeof this.props.nextStep === 'string' ? 
          <Anchor className={disabled} cta={this.props.nextCta}  step="forward" target="confirmation" /> : 
          <Button className="button" cta={this.props.nextCta} disabled={disabled} step={this.props.nextStep} />
        }
      </div>
    )
  }
}