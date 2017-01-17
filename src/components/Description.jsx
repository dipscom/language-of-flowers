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
            <IndexLink to="/" id="reset-button" onClick={this.reset}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.7 52.5"><path d="M21.8 14.7c0.9 0.9 1.8 1.7 2.7 2.7 1.5 1.6 0.7 4.3-1.5 4.8 -1 0.2-1.9-0.1-2.7-0.8 -2.4-2.4-4.8-4.8-7.2-7.2 -0.8-0.8-1.6-1.6-2.4-2.4 0.1-0.1 0.2-0.2 0.2-0.3 3.1-3.1 6.2-6.3 9.3-9.4 1.3-1.3 3.1-1.3 4.2 0 1.1 1.2 1.1 2.8 0 4 -0.9 0.9-1.8 1.8-2.8 2.7 0.7 0.1 1.3 0.1 1.9 0.1 4 0.3 7.6 1.6 10.8 4 5 3.7 8.1 8.6 9 14.8 1.4 9.8-3.7 19-12.7 23.1C19.9 55.5 6.9 50.6 2 39.8c-1.3-2.9-2-5.9-2-9 0-1.7 1.1-3 2.8-3 1.7 0 2.9 1.1 3 2.9 0.1 3.5 1.1 6.6 3.1 9.4 2.9 3.9 6.7 6.1 11.6 6.5 8.1 0.7 15.5-4.7 17.2-12.7 1.9-8.7-4.1-17.6-12.9-19.1 -0.9-0.2-1.9-0.2-2.8-0.3C21.9 14.5 21.8 14.6 21.8 14.7z"/></svg> Start Again</IndexLink>
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
