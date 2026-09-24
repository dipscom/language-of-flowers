import React, { Component } from 'react';
import { gsap } from 'gsap';

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
            {/*<svg className="doubleline-decoration" viewBox="0 0 1400 40" preserveAspectRatio="xMidYMid">
              <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
              <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
            </svg>*/}
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




  animateAppear(callback) {
    callback();
  }
  animateEnter(callback) {
    let currentTarget = "#" + this.el.id;

    gsap.from("#flower-details " + currentTarget + " figure", {
      autoAlpha:0,
      ease: "power4.inOut",
      duration: 0.8,
    });

    gsap.from("#flower-details " + currentTarget + " .word", {
      autoAlpha: 0,
      ease: "power2.out",
      duration: 0.3,
      stagger: 0.05,
    });

    callback();
  }
}
