import React, { Component } from 'react';
import Flower from './Flower';

export default class FlowerSelect extends Component {
  componentWillAppear(callback) {
		console.log("FlowerSelect will appear")
		callback();
	}
	componentWillEnter(callback) {
		console.log("FlowerSelect will enter")
		callback();
	}
	componentDidEnter() {
		console.log("FlowerSelect did enter")
	}
	componentDidAppear() {
		console.log("FlowerSelect did appear")
	}
  render() { 
    return (
      <div id="flower-select">
      	<h1>Choose your bouquet</h1>
      	<strong>Select 3 flowers:</strong>
      	<ul id="flower-list">
      		{Object
      			.keys(this.props.flowers)
      			.map(key => 
      				<Flower
      					key={key}
      					index={key}
      					details={this.props.flowers[key]}
      					selectFlower={this.props.selectFlower}
      					updateActiveFlower={this.props.updateActiveFlower} />)
      		}
      	</ul>
      	<ol id="bouquet-list">
      		{this.props.bouquet
      			.map(key => 
      				<Flower
      					key={key}
      					index={key}
      					details={this.props.flowers[key]} />)
      		}
      	</ol>
      </div> 
    )
  }
}