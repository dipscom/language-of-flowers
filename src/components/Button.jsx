import React, { Component } from 'react';

export default class Button extends Component {

  render() { 
  	let classes = '';
  	if (this.props.step.name === 'bound nextStep') {
  		classes += 'button';
  	} else if (this.props.step.name === 'bound prevStep') {
  		classes += 'back-button';
  	}
    return (
      <button className={classes} disabled={this.props.disabled} type="button" onClick={this.props.step}>{this.props.cta}</button> 
    )
  }
}