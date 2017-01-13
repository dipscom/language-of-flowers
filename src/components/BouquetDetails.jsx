import React, { Component } from 'react'
import { Link } from 'react-router';

export default class BouquetDetails extends Component {
  render() {
    return (
      <div id="bouquet-list">
      <div>
        <h1>Your Bouquet<hr /></h1>
        <ul>
            { this.props.bouquet.map(this.props.bouquetMeaning) }   
        </ul>
        <Link className="change-bouquet" to="/create-bouquet">Change your bouquet</Link>
      </div>
      <Link className="button" to="/recipient">Their Details</Link>
      </div>
    )
  }
}