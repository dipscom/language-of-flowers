import React, { Component } from 'react';

export default class Bouquet extends Component{
  render() {
    return (
    	<div id="bouquet">
    	<h1>Your Bouquet</h1>
    	<figure id="bouquet-image" style={{backgroundImage: 'url(/images/bouquets/' + [...this.props.bouquet].sort().toString().replace(/,/g, '_') + '.png)'}}></figure>
    	</div>
    )
  }
}