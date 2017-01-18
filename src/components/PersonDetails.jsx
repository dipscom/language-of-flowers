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
  		(this.props[this.props.index].name !== '' && this.props[this.props.index].valid 
  			? '' 
  			: disabled = 'disabled')
  		 
  	} else {
  		(this.props[this.props.index].name !== '' && this.props[this.props.index].valid 
  			? '' 
  			: disabled = true)
  	}
    return (
    	<form className="person-input">
	    	<h1>{this.props.heading}</h1>
	    	<label htmlFor="name">{this.capitalizeFirstLetter(this.props.index)} first name</label>
	    	<input type="text" id="name" className={this.props.index} name="name" value={this.props[this.props.index].name} placeholder="Name" required onChange={(e) => this.props.updateField(e)} />
	    	<label htmlFor="email">{this.capitalizeFirstLetter(this.props.index)} email</label>
	    	<input type="email" id="email" className={this.props.index} name="email" value={this.props[this.props.index].email} placeholder="Email" required onChange={(e) => this.props.updateField(e)} />
	    	<Button cta={this.props.prevCta} step={this.props.prevStep} />
	    	{ typeof this.props.nextStep === 'string' ? 
	    		<Anchor name={this.props.nextCta} className={disabled} step="forward" target={this.props.nextStep} /> : 
	    		<Button cta={this.props.nextCta} disabled={disabled} step={this.props.nextStep} />
	    	}
    	</form>
    )
  }
}