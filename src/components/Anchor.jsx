import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Anchor extends Component {
  render() {
  	let classes = (this.props.className ? this.props.className : '' );
  		if (this.props.step === 'forward') {
  			classes += ' button';
  		} else if (this.props.step === 'backward') {
  			classes += ' back-button';
  		}
    return (
      <Link
        className={classes}
        to={"/" + this.props.target}
        onClick={this.props.click}>
          {this.props.cta}
      </Link> 
    )
  }
}
