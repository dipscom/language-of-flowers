import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SelectFlowers extends Component {
  constructor() {
    super();
    this.bouquetList = this.bouquetList.bind(this);
    this.renderFlower = this.renderFlower.bind(this);
  }
  bouquetList(key) {
    const flower = this.props.flowers[key];
    return (
      <li key={key}><strong>{flower.name}</strong> <span>({flower.meaning})</span></li>
      )
  }
  renderFlower(key) {
    const flower = this.props.flowers[key];
    const styles = {
      backgroundImage: 'url(/images/flowers/' + key + '.png)',
    };
    let checked = false,
        disabled = false;
    if (this.props.bouquet.length >= 3) {
      if (flower.selected === true) {
        checked = true;
      } else {
        disabled = true;
      }
    } else {
      disabled = false;
    }
    return (
      <label key={key}>
      <div>
      <input name="flower" value={key} type="checkbox" style={styles} defaultChecked={checked} disabled={disabled} onMouseOver={() => this.props.getActiveFlower(key)} onClick={() => this.props.selectBouquet(key)} /></div>
      <div><h2>{flower.name}</h2>
      <h3>Meaning</h3>
      <strong>{flower.meaning}</strong>
      <p>{flower.description}</p></div>
      </label>
    )
  }
  render() {
    return (
      <div
        id="select-flowers"
        key="select-flowers"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <h1>Create your bouquet
          <svg className="doubleline-decoration" viewBox="0 0 1400 40">
            <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
            <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
          </svg>
          </h1>
        <p>Select 3 flowers:</p>
        <form>{
          Object
          .keys(this.props.flowers)
          .map(this.renderFlower)
        }</form>
        <div>
          <ol>
            {this.props.bouquet.map(this.bouquetList)}
          </ol>
          <Link className="button" to="/view-bouquet">View your bouquet</Link>
        </div>
      </div>
    )
  }




  // /* Animation */
  // animateIn(callback, delay) {
  //   TweenMax.from(this.el, 1, { // eslint-disable-line
  //     autoAlpha:0,
  //     delay: delay || 0,
  //     onComplete:callback
  //   });
  // }
  //
  // animateOut(callback) {
  //   TweenMax.to(this.el, 1, { // eslint-disable-line
  //     autoAlpha:0,
  //     ease: "Power4.easeIn",
  //     onComplete:callback
  //   });
  // }
  //
  //
  // /* React Animation Callbacks */
  // componentWillEnter(callback) {
  //   console.log("SelectFlowers Will enter");
  //   // this.animateIn(callback, 1);
  // }
  //
  // componentDidEnter() {
  //   console.log("SelectFlowers Did enter");
  // }
  //
  // componentWillAppear(callback) {
  //   console.log("SelectFlowers Will appear");
  //   this.animateIn(callback, 1);
  // }
  //
  // componentDidAppear() {
  //   console.log("SelectFlowers Did appear");
  // }
  //
  // componentWillLeave(callback) {
  //   console.log("SelectFlowers Will leave");
  //   // this.animateOut(callback);
  // }
  //
  // componentDidLeave() {
  //   console.log("SelectFlowers Did leave");
  // }

}
