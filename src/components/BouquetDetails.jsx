import React, { Component } from 'react';
import Anchor from './Anchor';
import Button from './Button';
import Flower from './Flower';

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
  componentWillAppear(callback) {
    // console.log("BouquetDetails will appear")
    callback();
  }
  componentWillEnter(callback) {
    // console.log("BouquetDetails will enter");
    TweenMax.set("#form > div", {scrollTo:0, ease:"Power2.easeInOut"}); // eslint-disable-line
    
    TweenMax.from("#bouquet-details", 0.5, { // eslint-disable-line
      autoAlpha:0,
      delay: 0.5,
      onComplete:callback
    });



  }
  componentDidEnter() {
    // console.log("BouquetDetails did enter")
  }
  componentDidAppear() {
    // console.log("BouquetDetails did appear")
  }
  componentWillLeave(callback) {
    // console.log("BouquetDetails will leave");
    TweenMax.set("#bouquet-details", { // eslint-disable-line
      position:"absolute"
    });
    TweenMax.to("#bouquet-details", 0.5, { // eslint-disable-line
      autoAlpha:0,
      onComplete:callback
    });
  }


}
