import React, { Component } from 'react';

export default class Bouquet extends Component{
  render() {
    return (
    	<img id="bouquet-image" src={'/images/bouquets/' + [...this.props.bouquet].sort().toString().replace(/,/g, '_') + '.png'} alt="Bouquet" title="Bouquet" />
    )
  }
}