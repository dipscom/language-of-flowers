import React, { Component } from 'react';

export default class Flower extends Component{
  render() {
    return (
    	<div id="flower-details">
          <img src={'/images/flowers/' + this.props.activeFlower + '.png'} alt={this.props.flowers[this.props.activeFlower].name} title={this.props.flowers[this.props.activeFlower].name} />
          <div>
            <h1>{this.props.flowers[this.props.activeFlower].name}</h1>
            <strong>{this.props.flowers[this.props.activeFlower].meaning}</strong>
            <p>{this.props.flowers[this.props.activeFlower].description}</p>
          </div>
          </div>
    )
  }
}


