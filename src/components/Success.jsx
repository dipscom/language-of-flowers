import React, { Component } from 'react';

export default class Success extends Component{
  constructor() {
    super();
    
    this.renderProduct = this.renderProduct.bind(this);
  }
  renderProduct(key) {
    const product = this.props.products[key];
    const styles = {
      backgroundImage: 'url(/images/products/' + key + '.png)',
    };
    return (
      <li key={key}>
        <a href={product.link} target="_blank" title={product.name}>
          <figure style={styles}></figure>
          <div><h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Buy</p>
          </div>
        </a>
      </li>
    )
  }

  render() {
    return (
      <div
      id="success"
        key="confirmation"
        className="stage"
        ref={
          (el) => {
            this.el = el;
          }
        }
      ><div>
      
      {/*<div id="thank-you">
        <h1>Thank You!
        <svg className="doubleline-decoration" viewBox="0 0 1400 40">
          <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
          <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
        </svg>
        </h1>
        <p>Your encoded bouquet has been sent.</p>
      </div>*/}

      <div id="products">
        <p>Why not match one of our <a href="" target="_blank" title="Portrait fragrances">Portrait fragrances</a> to your bouquet...
        </p>
        <ul>
        <svg className="doubleline-decoration" viewBox="0 0 1400 40">
          <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
          <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
        </svg>
          {
          Object
          .keys(this.props.products)
          .map(this.renderProduct)
        }
        <svg className="doubleline-decoration reflected" viewBox="0 0 1400 40">
          <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
          <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
        </svg>
        </ul>
        <p>Alternatively you can find your perfect Penhaligon's scent with our online <a href="" target="_blank" title="Fragrance Profiling Experience">Fragrance Profiling Experience</a></p>
      </div>



      </div>
      </div>
    )
  }




  /* Animation */
  animateIn(callback, delay) {
    TweenMax.from(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      delay: delay || 0,
      onComplete:callback
    });
  }

  animateOut(callback) {
    TweenMax.to(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      ease: Power2.easeIn, // eslint-disable-line
      onComplete:callback
    });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    console.log("Confirmation Will enter");
    this.animateIn(callback, 1);
  }

  componentDidEnter() {
    console.log("Confirmation Did enter");
  }

  componentWillAppear(callback) {
    console.log("Confirmation Will appear");
  }

  componentDidAppear() {
    console.log("Confirmation Did appear");
  }

  componentWillLeave(callback) {
    console.log("Confirmation Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    console.log("Confirmation Did leave");
  }

}
