import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Introduction extends Component {
  render() {
    return (
      <div
        id="introduction"
        key="introduction"
        className="page"
        >
        <div>
          <div>
            {/*<img className="logo" src="./images/penhalions-logo.svg" alt="Penhaligon's - est. London 1870 - Portraits" title="Penhaligon's - est. London 1870 - Portraits" />*/}
            <header>
              <svg className="doubleline-decoration" viewBox="0 0 1400 40" preserveAspectRatio="xMidYMid">
                <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
              </svg>
              <h1>Some things are unutterable and secret. Other thoughts are so hard to say...</h1>
              <svg className="doubleline-decoration reflected" viewBox="0 0 1400 40">
                  <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                  <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
                </svg>
            </header>
            <p>Thank Heavens for the coded art of flowers. A mysterious language - of love? Cryptic communications, secret assignations, hidden revelations, coded declarations! Floriography. Oh! what a gift! Quel cadeau.</p>
            <p><strong>Penhaligon&#39;s invites you to send your very own coded bouquet.</strong></p>
            <div>
              <Link className="button active" to="/description">Lets Begin <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 221.1 127.4"><polygon points="0 0.3 221.1 64 0.1 127.4 35.4 66.9 "/></svg></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
