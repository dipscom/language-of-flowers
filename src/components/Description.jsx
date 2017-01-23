import React, { Component } from 'react';
import Anchor from './Anchor';
import { AnimationIntro } from '../animation/AnimationIntro'


class Description extends Component {
  render() {
    return (
      <div
        id="description"
        key="description"
        className="page"
        ref={
          (el) => {
            this.trg = el;
          }
        }
        >
        <div>
          <div>
            {/*<img className="logo" src="./images/lof-logo.svg" alt="The Language of Flowers" title="The Language of Flowers" />*/}
            <header>
              {/*<svg className="doubleline-decoration" viewBox="0 0 1400 40" preserveAspectRatio="xMidYMid">
                  <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                  <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
                </svg>*/}
              <hr />
              <h1>Bouquets full of hidden meaning.</h1>
              <hr className="reflected" />
                {/*<svg className="doubleline-decoration reflected" viewBox="0 0 1400 40">
                    <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                    <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
                  </svg>*/}
            </header>
            <p>With Penhaligon’s Floriography, indiscrete messages can be relayed between sweethearts, paramours and sugar peas – but what could be more (ah-em) improbable!</p>
            <p><strong>Choose the flowers and the recipient wisely</strong></p>
            <nav className="navigation">
              <Anchor cta="Create your own bouquet" step="forward" target="build-bouquet" />
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default AnimationIntro(Description);
