import React, { Component } from 'react';
import Anchor from './Anchor';
import { AnimationIntro } from '../animation/AnimationIntro'


class Introduction extends Component {
  render() {
    return (
      <div
        id="introduction"
        key="introduction"
        className="page"
        ref={
          (el) => {
            this.trg = el;
          }
        }
      >
        <div>
          <div>
            <figure id="penhaligons-logo">
              <a href="https://www.penhaligons.com/?utm_source=Language%20of%20Flowers&utm_medium=Referral&utm_content=Website" title="Penhaligon's" target="_blank"><img src="./images/penhalions-logo.svg" alt="Penhaligon's - est. London 1870 - Portraits" title="Penhaligon's - est. London 1870 - Portraits" /></a>
            </figure>
            <header>
              {/*<svg className="doubleline-decoration" viewBox="0 0 1400 40" preserveAspectRatio="xMidYMid">
                <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
              </svg>*/}
              <hr />             
              <h1>Some things are unutterable and secret. Other thoughts are so hard to say...</h1>
              <hr className="reflected" />
              {/*<svg className="doubleline-decoration reflected" viewBox="0 0 1400 40">
                  <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                  <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
                </svg>*/}
            </header>
            <p>Thank Heavens for floriography. A mysterious language of love. Cryptic communications, hidden revelations and coded declarations!</p>
            <p><strong>Penhaligon&#39;s invites you to send your very own coded bouquet.</strong></p>
            <p>(And be in with a chance to win the Penhaligon’s Portraits Collection)</p>
            <nav className="navigation">
              <Anchor cta="Let's begin" step="forward" target="description" />
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default AnimationIntro(Introduction);
