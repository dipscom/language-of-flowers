import React, { Component } from 'react';
import Button from './Button';
import Anchor from './Anchor';

export default class PersonDetails extends Component {
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
  render() {
    return (
    	<form className="person-input">
	    	<h1>{this.props.heading}</h1>
	    	<input type="text" className={this.props.index} name="name" value={this.props[this.props.index].name} placeholder="Name" required onChange={(e) => this.props.updateField(e)} />
	    	<input type="email" className={this.props.index} name="email" value={this.props[this.props.index].email} placeholder="Email" required onChange={(e) => this.props.updateField(e)} />
	    	<Button cta={this.props.prevCta} step={this.props.prevStep} />
	    	{ typeof this.props.nextStep === 'string' ? 
	    		<Anchor name={this.props.nextCta} target={this.props.nextStep} /> : 
	    		<Button cta={this.props.nextCta} step={this.props.nextStep} />
	    	}
    	</form>
    )
  }
}