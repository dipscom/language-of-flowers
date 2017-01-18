import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Anchor extends Component {
  render() { 
    return (
      <Link className="button" to={this.props.target}>{this.props.name}</Link> 
    )
  }
}