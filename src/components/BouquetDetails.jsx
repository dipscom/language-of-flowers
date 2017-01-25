import React, { Component } from 'react';
import Anchor from './Anchor';
import Button from './Button';
import Flower from './Flower';
import ResetScroller from '../animation/ResetScroller';
import HeroImageIn from '../animation/HeroImageIn'
import FadeOut from '../animation/FadeOut';



export default class BouquetDetails extends Component {
  render() {
    return (
      <div id="bouquet-details">
      	<div>
          <header>
  	      	<h1>Your Bouquet</h1>
            {/*<svg className="doubleline-decoration" viewBox="0 0 1400 40" preserveAspectRatio="xMidYMid">
                <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
              </svg>*/}
              <hr />

  	      </header>
  	      <ol className="bouquet-list">
            { this.props.step !== 2 ?
              <li><p>Your beloved has sent you a beautiful floral bouquet. The meanings of their chosen flowers are listed below.</p></li> :
                ''
              }

  	      	{this.props.bouquet
  	      		.map(key =>
  	      			<Flower
  	      				key={key}
  	      				index={key}
  	      				details={this.props.flowers[key]} />)
  	      	}
  	      </ol>
          { this.props.step === 2 ?
            <Button className="back-button" cta={this.props.prevCta} step={this.props.prevStep} /> :
            ''
          }
          { this.props.step === 2 ?
            <Button className="button" cta={this.props.nextCta} step={this.props.nextStep} /> :
            <Anchor className="center" cta={this.props.nextCta} step="forward" target="share" />
          }
        </div>
	    </div>
    )
  }




  /* Animation */
  animateIn(callback, delay) {
    let tl = new TimelineMax({delay:delay || 0, onComplete:callback}); // eslint-disable-line
    let dur = 1.5;

    // Reset the scroller position
    ResetScroller('form', delay);

    HeroImageIn(callback, 0.5)

    TweenMax.set("#bouquet-details", {position:"absolute"})// eslint-disable-line

    tl.add("Details", 0.1)
    if(window.innerHeight > window.innerWidth){
      tl.from(["#bouquet-details header","#form-navigation"], dur, {
        autoAlpha: 0,
        ease: "Power4.easeInOut"
      }, "Details");
    }
    tl.staggerFrom("#bouquet-details li", dur, {
      autoAlpha: 0,
      ease: "Power4.easeInOut",
      onStart:function () {
        TweenMax.set("#bouquet-details", {position:"relative"}); // eslint-disable-line
      }
    }, 0.25, "Details")
    tl.staggerFrom(["#bouquet-details button"], dur, {
      autoAlpha: 0,
      ease: "Power4.easeInOut"
    }, 0.25, "-=0.5")
    tl.set("#bouquet-details", {clearProps:"all"})


    return tl;
  }

  componentWillAppear(callback) {
    // console.log("BouquetDetails will appear")
    this.animateIn(callback, 0.5);
  }
  componentWillEnter(callback) {
    // console.log("BouquetDetails will enter");
    this.animateIn(callback, 0.5);
  }
  componentDidEnter() {
    // console.log("BouquetDetails did enter")
  }
  componentDidAppear() {
    // console.log("BouquetDetails did appear")
  }
  componentWillLeave(callback) {
    // console.log("BouquetDetails will leave");
    // If in portrait mode
    if(window.innerHeight > window.innerWidth) {
        TweenMax.to("#hero-image", 0.5, { // eslint-disable-line
          autoAlpha:0
        });
    }

    FadeOut('bouquet-details', callback)
  }


}
