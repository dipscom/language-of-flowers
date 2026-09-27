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
              <hr />
              <h1>Bouquets full of hidden meaning.</h1>
              <hr className="reflected" />
            </header>
            <p>
              With floriography, indiscrete messages can be relayed between
              sweethearts, paramours and sugar peas — but what could be more
              (ah-em) improbable!
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
