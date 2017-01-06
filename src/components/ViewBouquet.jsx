import React, { Component } from 'react'

export default class ViewBouquet extends Component {
  render() {
    return (
      <div className="bouquet">
      <div>
        <h1>Your Bouquet</h1>
        <ul>
            { this.props.bouquet.map(this.props.bouquetMeaning) }   
        </ul>
        <button onClick={this.props.prevStage}>Change your bouquet</button>
      </div>
      <button onClick={this.props.nextStage}>Their Details</button>
        
      </div>
    )
  }
}