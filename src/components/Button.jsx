import React, { Component } from 'react';

export default class Button extends Component {
  render() { 
    return (
      <button className="button" type="button" onClick={this.props.step}>{this.props.cta}</button> 
    )
  }
}