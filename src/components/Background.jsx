import React, { Component } from 'react';

export default class Background extends Component {

  /* Animation */
  componentWillAppear(callback) {
    console.log("Background Will appear");

  }

  componentDidAppear(callback) {
    console.log("Background Did appear");
  }


  render() {
    return (
      <div
        id="background"
        key="background"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >

      </div>
    )
  }
}
