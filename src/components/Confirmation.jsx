import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Confirmation extends Component {
  render() {
    return (
      <div
        key="confirmation"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <div>
          <h1>Confirm & Send</h1>
          <p>On this fine day we shalt send your message of:</p>
          <ul>
              { this.props.bouquet.map(this.props.bouquetMeaning) }
          </ul>
          <p>to your dearest <span>{this.props.recipient.name}</span> at the royal postal address of <span>{this.props.recipient.email}</span> from <span>{this.props.sender.name}</span><span>({this.props.sender.email})</span></p>
          <p className="terms">Be in with a chance to win the full Penhaligon's portraits collection.</p>
          <p className="terms">plus join the very Penhaligon's club and discover our online secrets <label htmlFor="terms">I agree with the Terms and Conditions/Privacy Policy</label><input type="checkbox" name="terms" /></p>
        </div>
        <Link className="button" to="/success">Send Now</Link>
      </div>
    )
  }




  /* Animation */
  animateIn(callback, delay) {
    TweenMax.from(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      delay: delay || 0,
      onComplete:callback
    });
  }

  animateOut(callback) {
    TweenMax.to(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      ease: Power2.easeIn, // eslint-disable-line
      onComplete:callback
    });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    console.log("Confirmation Will enter");
    this.animateIn(callback, 1);
  }

  componentDidEnter() {
    console.log("Confirmation Did enter");
  }

  componentWillAppear(callback) {
    console.log("Confirmation Will appear");
  }

  componentDidAppear() {
    console.log("Confirmation Did appear");
  }

  componentWillLeave(callback) {
    console.log("Confirmation Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    console.log("Confirmation Did leave");
  }

}
