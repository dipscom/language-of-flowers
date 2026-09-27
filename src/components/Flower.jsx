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
      <li
        id={this.props.index}
        className="flower"
        ref={
          (el) => {
            this.el = el;
          }
        }
        >
      	<div className={classes}
      		onClick={(selectFlower ? () => {selectFlower(index)} : '')}
      		onMouseOver={
      			(updateActiveFlower ? () => {this.props.updateActiveFlower(index)} : '')}>
	      	<figure style={{backgroundImage: 'url(/images/flowers/' + this.props.index + '.png)'}}><div></div></figure>
	      	<div className="flower-details">
	      		<h1 className="word">{details.name}</h1>
            <hr />
	      		<strong className="sub-heading word">Meaning</strong>
	      		<div>
	      			<p className="word">{details.meaning}</p>
	      			<p className="word">{details.description}</p>
	      		</div>
	      	</div>
	      </div>
      </li>
    )
  }




  componentWillAppear(callback) {
    // console.log("Flower will appear")
    callback();
  }
  componentWillEnter(callback) {
    // console.log("Flower will enter");

    let currentTarget = "#" + this.el.id;

    TweenMax.from("#flower-details " + currentTarget + " figure", 0.8, { // eslint-disable-line
      autoAlpha:0,
      ease: "Power4.easeInOut",
    });

    TweenMax.staggerFrom("#flower-details " + currentTarget + " .word", 0.3, { // eslint-disable-line
      autoAlpha: 0,
      ease: "Power2.easeOut",
    }, 0.05);

    callback();
  }
  componentDidEnter() {
    // console.log("Flower did enter")
  }
  componentDidAppear() {
    // console.log("Flower did appear")
  }
}
