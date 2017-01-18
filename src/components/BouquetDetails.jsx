import React, { Component } from 'react';
import Anchor from './Anchor';
import Button from './Button';
import Flower from './Flower';

export default class BouquetDetails extends Component {
	// componentWillMount() {
	// 	let prevButton, nextButton;
 //  	if (this.props.step === 2) {
 //  		prevButton = <Button cta={this.props.prevCta} step={this.props.prevStep} />;
 //  		nextButton = <Button cta={this.props.nextCta} step={this.props.nextStep} />;
 //  	} else {
 //  		nextButton = <Anchor name={this.props.nextCta} step="forward" target={this.props.nextStep} />;
 //  	}
	// }
  render() {
    return (
      <div id="bouquet-details">
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
	      <Button cta={this.props.prevCta} step={this.props.prevStep} />
	      <Button cta={this.props.nextCta} step={this.props.nextStep} />
	      {/*prevButton}
	      {nextButton*/}
	    </div>
    )
  }




  /* Animation */
  componentWillAppear(callback) {
    console.log("BouquetDetails will appear")
    callback();
  }
  componentWillEnter(callback) {
    console.log("BouquetDetails will enter")
    callback();
  }
  componentDidEnter() {
    console.log("BouquetDetails did enter")
  }
  componentDidAppear() {
    console.log("BouquetDetails did appear")
  }

}
