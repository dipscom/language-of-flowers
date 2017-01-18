import React, { Component } from 'react';

export default class Button extends Component {
  render() { 
    return (
      <button className="button" disabled={this.props.disabled} type="button" onClick={this.props.step}>{this.props.cta}</button> 
    )
  }
}