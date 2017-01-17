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
      <Link className="button active" to="/recipient">Their Details <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 221.1 127.4"><polygon points="0 0.3 221.1 64 0.1 127.4 35.4 66.9 "/></svg></Link>
      </div>
    )
  }
}
