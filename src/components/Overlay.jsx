import React, { Component } from 'react';

export default class Overlay extends Component {

  render() {
    return (
      <div
        id="overlay"
        key="overlay"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >

        <img id="man" src="/images/overlay/man.png" alt="" />

        <img id="flowersBottomRight" src="/images/overlay/flowers-bottomright.png" alt="" className="flowers bottom right" />

        <img id="flowersMidLeft" src="/images/overlay/flowers-midleft.png" alt="" className="flowers mid left" />

        <img id="lady"src="/images/overlay/lady.png" alt=""  />

        <img id="flowersBottom" className="flowers bottom left" src="/images/overlay/flowers-bottom.png" alt="" />

        <img id="flowersTopLeft" src="/images/overlay/flowers-topleft.png" alt="" className="flowers top left" />

        <img id="flowersTopRight" src="/images/overlay/flowers-topright.png" alt="" className="flowers top right" />

        <img id="peacock" src="/images/overlay/peacock.png" alt="" />
        <img id="stag" src="/images/overlay/stag.png" alt="" />


      </div>
    )
  }
}
