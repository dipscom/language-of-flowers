import React, { Component } from 'react';

export default class Flower extends Component {
  
  render() {
  	const { details, index, selectFlower, updateActiveFlower } = this.props;
    return (
      <li className="flower">
      	<div 
      		onClick={(selectFlower ? () => {selectFlower(index)} : '')}
      		onMouseOver={
      			(updateActiveFlower ? () => {this.props.updateActiveFlower(index)} : '')}>
	      	<figure style={{backgroundImage: 'url(/images/flowers/' + this.props.index + '.png)'}}><div></div></figure>
	      	<div>
	      		<h1>{details.name}</h1>
	      		<strong>Meaning</strong>
	      		<p>{details.meaning}</p>
	      		<p>{details.description}</p>
	      	</div>
	      </div>
      </li>
    )
  }
}