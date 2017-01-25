import React, { Component } from 'react';
import Button from './Button';
import Anchor from './Anchor';
import ResetScroller from '../animation/ResetScroller';
import FadeIn from '../animation/FadeIn';
import FadeOut from '../animation/FadeOut';



export default class PersonDetails extends Component {
	constructor(){
    super();
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);

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
    	<div id={this.props.index} className="person-details">
      <form>
    		<header>
	    		<h1>{this.props.heading}</h1>
	    		{/*<svg className="doubleline-decoration" viewBox="0 0 1400 40">
            <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
            <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
          </svg>*/}
          <hr />
	    	</header>
	    	<label htmlFor="name">{this.capitalizeFirstLetter(this.props.index)}&rsquo;s full name</label>
	    	<input type="text" id="name" className={this.props.index} name="name" maxLength="20" value={this.props[this.props.index].name} placeholder="Full Name" required onChange={(e) => this.props.updateField(e)} autoComplete="off" tabIndex="1" />
	    	<label htmlFor="email">{this.capitalizeFirstLetter(this.props.index)}&rsquo;s email</label>
	    	<input type="email" id="email" className={this.props.index} name="email" value={this.props[this.props.index].email} placeholder="Email" required onChange={(e) => this.props.updateField(e)} />
	    	<Button className="back-button" cta={this.props.prevCta} step={this.props.prevStep} autocomplete="off" tabIndex="2" />
	    	{ this.props.index === 'recipient' ?
	    		<p className="terms">Contact details for the recipient should only  be provided with that person’s consent, and that person may be told who provided their details.</p> :
          ''
        }
    	</form>
      { typeof this.props.nextStep === 'string' ?
          <Anchor className={disabled} cta={this.props.nextCta}  step="forward" target="confirmation" /> :
          <Button className="button" cta={this.props.nextCta} disabled={disabled} step={this.props.nextStep} />
        }
      </div>
    )
  }




	/* Animation */
	componentWillAppear(callback) {
		console.log("PersonInput will appear")
		if(window.innerHeight > window.innerWidth){
			TweenMax.set("#hero-image", {className:"hide-portrait"}); // eslint-disable-line
		}

		callback();
	}

	componentWillEnter(callback) {
		// console.log("PersonInput will enter");
		let dly = 0.5;
		FadeIn(this.props.index, dly, callback);

		ResetScroller('form', dly);

	}

	componentDidEnter() {
		// console.log("PersonInput did enter");
	}
	componentDidAppear() {
		// console.log("PersonInput did appear");
	}
	componentWillLeave(callback) {
		// console.log("PersonInput will leave");
		FadeOut(this.props.index);

		// Change this eventually - Look at note in FadeOut.js
		const trg = "#" + this.props.index;
		TweenMax.set(trg, { // eslint-disable-line
			position:"absolute",
			top:0,
			left:0
		});
	}
}
