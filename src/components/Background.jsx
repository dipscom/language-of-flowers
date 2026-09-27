import React, { Component } from 'react';

export default class Background extends Component {
  render() {
    return (
      <div id="background">
      	<div id="forest">
      		<figure></figure>
      	</div>
      	<div id="paper">
      		<img role="presentation" id="cloud1" className="cloud" src="/images/background/cloud-1.png" />
          <img role="presentation" id="cloud2" className="cloud" src="/images/background/cloud-2.png" />
          <div id="line-top-wrapper">
            <svg id="line-top" className="line-decoration" viewBox="0 0 1400 50" preserveAspectRatio="xMidYMin">
              <path className="segment" d="M700 20 Q690 0.5, 660 0.5 H0" vectorEffect="non-scaling-stroke"  />
              <path className="segment" d="M700 20 Q710 0.5, 740 0.5 H1400" vectorEffect="non-scaling-stroke"  />
            </svg>
          </div>
          <div id="line-left-wrapper">
            <svg id="line-left" className="line-decoration" viewBox="0 0 2 860">
              <path className="straight-segment" d="M0.5 0 V860" vectorEffect="non-scaling-stroke"  />
            </svg>
          </div>
          <div id="line-right-wrapper">
            <svg id="line-right" className="line-decoration" viewBox="0 0 2 860">
              <path className="straight-segment" d="M0.5 0 V860" vectorEffect="non-scaling-stroke"  />
            </svg>
          </div>
          <div id="line-bottom-wrapper">
            <svg id="line-bottom" className="line-decoration" viewBox="0 0 1400 2">
              <path className="straight-segment" d="M0 0.5 H1400" vectorEffect="non-scaling-stroke"  />
            </svg>
          </div>
          <img role="presentation" id="top-left" className="corner" src="/images/background/detail-corner.svg" />
          <img role="presentation" id="top-right" className="corner" src="/images/background/detail-corner.svg" />
          <img role="presentation" id="bottom-left" className="corner" src="/images/background/detail-corner.svg" />
          <img role="presentation" id="bottom-right" className="corner" src="/images/background/detail-corner.svg" />
          <img id="lof-logo" className="logo" src="./images/lof-logo.svg" alt="The Language of Flowers" title="The Language of Flowers" />
      	</div>
      </div>
    )
  }


  componentWillAppear() {
    // Use GSAP to center the image for better layout resize handling
    TweenMax.set("#forest", {xPercent:-50, yPercent:-50});// eslint-disable-line
  }

  componentWillEnter() {
    // Use GSAP to center the image for better layout resize handling
    TweenMax.set("#forest", {xPercent:-50, yPercent:-50});// eslint-disable-line
  }

}
