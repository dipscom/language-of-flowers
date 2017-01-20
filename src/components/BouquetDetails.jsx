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
    TweenMax.from("#bouquet-details", 0.5, { // eslint-disable-line
      autoAlpha:0,
      delay: 0.5,
      onComplete:callback
    })

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
