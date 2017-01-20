import React, { Component } from 'react';
import Anchor from './Anchor';

export default class MyBouquet extends Component{
  render() {
    return (
      <div
        id="my-bouquet"
        key="my-bouquet"
        className="page"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <div>
          <div>
            {/*<img className="logo" src="./images/lof-logo.png" alt="The Language of Flowers" title="The Language of Flowers" />*/}
            <header>
              <h1>Dear <span>{this.props.recipient.name}...</span></h1>
              <hr />
            </header>
            {/*<svg className="doubleline-decoration" viewBox="0 0 1400 40">
              <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke" />
              <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke" />
            </svg>*/}

            <p><strong>What could be more elegant than a bouquet of flowers!</strong></p>
            <p>A message that speaks a 1000 as yet unknown words...</p>
            <p><strong>Find out <span>{this.props.sender.name}’s</span> innermost feelings for you.</strong></p>
            <nav className="navigation">
              <Anchor cta="Decode your bouquet" step="forward" target="viewbouquet" />
            </nav>
          </div>
        </div>
      </div>
    )
  }
  
}