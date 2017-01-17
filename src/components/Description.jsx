import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

export default class Description extends Component {

  render() {
    return (
      <div
        id="description"
        key="description"
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
            <h1>

              <svg className="doubleline-decoration" viewBox="0 0 1400 40">
                <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
              </svg>

              Bouquets full of hidden&nbsp;meaning.

              <svg className="doubleline-decoration reflected" viewBox="0 0 1400 40">
                <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
              </svg>

            </h1>
            <p>Whilst we don't like to gossip it would appear that there was a 'mistake' and the flowers from Lord George, meant for Lady Blanche, well they seem to have been sent to the divine Clara...With Penhaligon’s Floriography, indiscrete messages can be relayed between sweethearts, paramours and sugar peas - but what could be more (ah-em) improbable!</p>
            <strong>Choose the flowers and the recipient wisely</strong>
            <div>
              <Link className="button active" to="/create-bouquet">Create your own bouquet <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 221.1 127.4"><polygon points="0 0.3 221.1 64 0.1 127.4 35.4 66.9 "/></svg></Link>
            </div>
        </div>
        </div>
        </div>
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
      ease: "Power4.easeIn",
      onComplete:callback
    });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    console.log("Description Will enter");
    this.animateIn(callback, 0.5);
  }

  componentDidEnter() {
    console.log("Description Did enter");
  }

  componentWillAppear(callback) {
    console.log("Description Will appear");
  }

  componentDidAppear() {
    console.log("Description Did appear");
  }

  componentWillLeave(callback) {
    console.log("Description Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    console.log("Description Did leave");
  }



}
