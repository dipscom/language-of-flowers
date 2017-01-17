import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Confirmation extends Component {
  render() {
    let linkClasses = 'button';
    if (this.props.terms) {
      linkClasses += ' active';
    }
    return (
      <div
        id="confirmation"
        key="confirmation"
        className="stage"
        ref={
          (el) => {
            this.el = el;
          }
        }
      ><div>
      <div>
          <h1>Confirm & Send
          <svg className="doubleline-decoration" viewBox="0 0 1400 40">
              <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
              <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
            </svg>
          </h1>
          <p>On this fine day we shalt send your message of:</p>
          <ul>
              { this.props.bouquet.map(this.props.bouquetMeaning) }
          </ul>
          <p>...to your dearest <span>{this.props.recipient.name}</span> at the royal postal address of <span>{this.props.recipient.email}</span> from <span>{this.props.sender.name}</span><span>({this.props.sender.email})</span>.</p>
          <p className="terms">Be in with a chance to win the full Penhaligon's portraits collection.<br/>plus join the very Penhaligon's club and discover our online secrets <label htmlFor="terms">(I agree with the Terms and Conditions/Privacy Policy). </label><input type="checkbox" name="terms" onChange={(e) => this.props.updateField(e)} /></p>
          <div className="separator">
          <Link className={linkClasses} to="/success">Send Now <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 221.1 127.4"><polygon points="0 0.3 221.1 64 0.1 127.4 35.4 66.9 "/></svg></Link>
          <Link className="back-link" to="/sender">Change details</Link>
          </div>

      </div></div></div>
    )
  }




  /* Animation */
  animateIn(callback, delay) {
    TweenMax.from(this.el, 0.5, { // eslint-disable-line
      autoAlpha:0,
      delay: delay || 0,
      onComplete:callback
    });
  }

  animateOut(callback) {
    TweenMax.to(this.el, 0.5, { // eslint-disable-line
      autoAlpha:0,
      ease: Power2.easeIn, // eslint-disable-line
      onComplete:callback
    });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    console.log("Confirmation Will enter");
    this.animateIn(callback, 0.5);
  }

  componentDidEnter() {
    console.log("Confirmation Did enter");
  }

  componentWillAppear(callback) {
    console.log("Confirmation Will appear");
    this.animateIn(callback, 3);
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
