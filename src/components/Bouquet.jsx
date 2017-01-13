import React, { Component } from 'react';

export default class Bouquet extends Component{
  render() {
    return (
    	<div id="bouquet">
    	<h1>Your Bouquet
        <svg className="doubleline-decoration" viewBox="0 0 1400 40">
          <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
          <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
        </svg>
      </h1>
    	<figure id="bouquet-image" style={{backgroundImage: 'url(/images/bouquets/' + [...this.props.bouquet].sort().toString().replace(/,/g, '_') + '.png)'}}></figure>
    	</div>
    )
  }
}
