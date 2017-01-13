import React, { Component } from 'react'
import { Link } from 'react-router';

export default class BouquetDetails extends Component {
  render() {
    return (
      <div id="bouquet-list">
      <div>
        <h1>Your Bouquet
          <svg className="doubleline-decoration" viewBox="0 0 1400 40">
          <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
          <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
        </svg>
        </h1>
        <ul>
            { this.props.bouquet.map(this.props.bouquetMeaning) }
        </ul>
        <Link className="back-link" to="/create-bouquet">Change your bouquet</Link>
      </div>
      <Link className="button" to="/recipient">Their Details</Link>
      </div>
    )
  }
}
