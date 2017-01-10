import React, { Component } from 'react'
import { Link } from 'react-router';

export default class ViewBouquet extends Component {
  render() {
    return (
      <div className="bouquet">
      <div>
        <h1>Your Bouquet</h1>
        <ul>
            { this.props.bouquet.map(this.props.bouquetMeaning) }   
        </ul>
        <Link to="/create-bouquet">Change your bouquet</Link>
      </div>
      <Link to="/recipient">Their Details</Link>
      </div>
    )
  }
}