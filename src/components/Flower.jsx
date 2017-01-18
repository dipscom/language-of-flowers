import React, { Component } from 'react';

export default class Flower extends Component {
  
  render() {
  	const { bouquetLength, details, index, selectFlower, updateActiveFlower } = this.props;
  	let classes = '';
  	if (details.selected) {
  		classes += 'checked';
  	} else if (bouquetLength >= 3 && !details.selected){
  		classes += 'disabled';
  	}
    return (
      <li className="flower">
      	<div className={classes} 
      		onClick={(selectFlower ? () => {selectFlower(index)} : '')}
      		onMouseOver={
      			(updateActiveFlower ? () => {this.props.updateActiveFlower(index)} : '')}>
	      	<figure style={{backgroundImage: 'url(/images/flowers/' + this.props.index + '.png)'}}><div></div></figure>
	      	<div className="flower-details">
	      		<h1>{details.name}</h1>
	      		<strong className="sub-heading">Meaning</strong>
	      		<div>
	      			<p>{details.meaning}</p>
	      			<p>{details.description}</p>
	      		</div>
	      	</div>
	      </div>
      </li>
    )
  }
}