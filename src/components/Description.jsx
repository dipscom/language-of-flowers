import React, { Component } from "react";
import Anchor from "./Anchor";
import { AnimationIntro } from "../animation/AnimationIntro";

class Description extends Component {
  render() {
    return (
      <div
        id="description"
        key="description"
        className="page"
        ref={(el) => {
          this.trg = el;
        }}
      >
        <div>
          <div>
            <header>
              {/*<svg className="doubleline-decoration" viewBox="0 0 1400 40" preserveAspectRatio="xMidYMid">
                  <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                  <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
                </svg>*/}
              <hr />
              <h1>Blooming lovely bouquets</h1>
              <hr className="reflected" />
              {/*<svg className="doubleline-decoration reflected" viewBox="0 0 1400 40">
                    <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                    <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
                  </svg>*/}
            </header>
            <p>
              With our floriography messages of love and admiration can be
              relayed to those dearest to your heart, those whose footsteps you
              follow and those who reside on top of a rather high pedestal.
            </p>
            <p>
              <strong>Choose the flowers wisely...</strong>
            </p>
            <nav className="navigation">
              <Anchor
                cta="Let's create your bouquet"
                step="forward"
                target="buildbouquet"
              />
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default AnimationIntro(Description);
