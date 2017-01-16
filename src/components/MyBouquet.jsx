import React, { Component } from 'react';

export default class MyBouquet extends Component{

  render() {
    console.log(this.props.location.query);
    return (
    	<div
        id="my-bouquet"
        key="my-bouquet"
        className="stage"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <div>
        <div>
        <img className="logo" src="./images/lof-logo.png" alt="The Language of Flowers" title="The Language of Flowers" />
        <h1>Dear <span>{this.props.location.query.recipient}...</span></h1>
        <svg className="doubleline-decoration" viewBox="0 0 1400 40">
                <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
              </svg>
        <p>What could be more elegant than a bouquet of flowers!</p>
        <p>A message that speaks a 1000 as yet unknown words...</p>
        <p>Find out <span>{this.props.location.query.sender}</span>’s innermost feelings for you.</p>
        <a className="button active" href="/create-bouquet">Decode your bouquet</a>
        </div></div></div>
        
    )
  }
}