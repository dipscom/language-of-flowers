import React, { Component } from 'react';
import { IndexLink } from 'react-router';

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
          <svg id="line-top" className="line-decoration" viewBox="0 0 1400 50">
            <path className="segment" d="M0 0.5 H660 Q690 0.5, 700 20 Q710 0.5, 740 0.5 H1400" vectorEffect="non-scaling-stroke"  />
          </svg>
          <svg id="line-left" className="line-decoration" viewBox="0 0 2 860">
            <path d="M0.5 0 V860" vectorEffect="non-scaling-stroke"  />
          </svg>
          <svg id="line-right" className="line-decoration" viewBox="0 0 2 860">
            <path d="M0.5 0 V860" vectorEffect="non-scaling-stroke"  />
          </svg>
          <svg id="line-bottom" className="line-decoration" viewBox="0 0 1400 2">
            <path d="M0 0.5 H1400" vectorEffect="non-scaling-stroke"  />
          </svg>
          <img role="presentation" id="top-left" className="corner" src="/images/background/detail-corner.svg" />
          <img role="presentation" id="top-right" className="corner" src="/images/background/detail-corner.svg" />
          <img role="presentation" id="bottom-left" className="corner" src="/images/background/detail-corner.svg" />
          <img role="presentation" id="bottom-right" className="corner" src="/images/background/detail-corner.svg" />
          <img className="logo" src="./images/lof-logo.svg" alt="The Language of Flowers" title="The Language of Flowers" />
      	</div>
      	<IndexLink to="/" id="reset-button" onClick={this.props.reset}>Start Again<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.7 52.5"><path d="M21.8 14.7c0.9 0.9 1.8 1.7 2.7 2.7 1.5 1.6 0.7 4.3-1.5 4.8 -1 0.2-1.9-0.1-2.7-0.8 -2.4-2.4-4.8-4.8-7.2-7.2 -0.8-0.8-1.6-1.6-2.4-2.4 0.1-0.1 0.2-0.2 0.2-0.3 3.1-3.1 6.2-6.3 9.3-9.4 1.3-1.3 3.1-1.3 4.2 0 1.1 1.2 1.1 2.8 0 4 -0.9 0.9-1.8 1.8-2.8 2.7 0.7 0.1 1.3 0.1 1.9 0.1 4 0.3 7.6 1.6 10.8 4 5 3.7 8.1 8.6 9 14.8 1.4 9.8-3.7 19-12.7 23.1C19.9 55.5 6.9 50.6 2 39.8c-1.3-2.9-2-5.9-2-9 0-1.7 1.1-3 2.8-3 1.7 0 2.9 1.1 3 2.9 0.1 3.5 1.1 6.6 3.1 9.4 2.9 3.9 6.7 6.1 11.6 6.5 8.1 0.7 15.5-4.7 17.2-12.7 1.9-8.7-4.1-17.6-12.9-19.1 -0.9-0.2-1.9-0.2-2.8-0.3C21.9 14.5 21.8 14.6 21.8 14.7z"/></svg></IndexLink>
      </div>
    )
  }

  componentWillAppear(callback) {
    // console.log("Background Will appear");
    const paperWidth = document.getElementById("paper").getBoundingClientRect().width * 1.5;


    // Use GSAP to center the image for better layout resize handling
    TweenMax.set("#forest", {xPercent:-50, yPercent:-50});// eslint-disable-line

    TweenMax.set(".cloud", {// eslint-disable-line
      xPercent:-50,
      x:function(i) {
        return (i+1) * paperWidth/3;
      }
    });


    // TweenMax.to("#cloud1", paperWidth*0.4, {// eslint-disable-line
    //   x:"+="+paperWidth,
    //   modifiers: {
    //     x:function(x) {
    //       return x % paperWidth
    //     }
    //   },
    //   repeat: -1,
    //   ease: "Linear.easeNone"
    // })
    // TweenMax.to("#cloud2", paperWidth*0.09, {// eslint-disable-line
    //   x:"+="+paperWidth,
    //   modifiers: {
    //     x:function(x) {
    //       return x % paperWidth
    //     }
    //   },
    //   repeat: -1,
    //   ease: "Linear.easeNone"
    // })


    this.tl = new TimelineMax({onComplete:callback}); // eslint-disable-line

    this.tl.staggerFrom(["#background","#paper",".cloud",".corner"], 1, {autoAlpha:0, ease:"Power2.easeInOut"}, 1)
    this.tl.to("#forest figure", 1.5, {scale:1.025}, 0)
    // this.tl.from(".border-top", 0.8, {
    //   drawSVG: 0,
    //   ease: "Power1.easeInOut"
    // })
  }

  componentDidAppear() {
    // console.log("Background Did appear");
  }

}
