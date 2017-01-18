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
        <header>
          <h1>Create your bouquet</h1>
          <svg className="doubleline-decoration" viewBox="0 0 1400 40" preserveAspectRatio="xMidYMid">
            <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
            <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
          </svg>
          <strong className="sub-heading">Select 3 flowers:</strong>
        </header>
      	<ul id="flower-list">
      		{Object
      			.keys(this.props.flowers)
      			.map(key => 
      				<Flower
      					key={key}
      					index={key}
                bouquetLength={this.props.bouquet.length}
      					details={this.props.flowers[key]}
      					selectFlower={this.props.selectFlower}
      					updateActiveFlower={this.props.updateActiveFlower} />)
      		}
      	</ul>
      	<ol className="bouquet-list">
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