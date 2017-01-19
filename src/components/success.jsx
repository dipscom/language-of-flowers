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
        className="page"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <div>
          <div id="thank-you">
            <header>
              <h1>Thank You!</h1>
              <svg className="doubleline-decoration" viewBox="0 0 1400 40">
                <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
              </svg>
            </header>
            <p><strong>Your encoded bouquet has been sent.</strong></p>
          </div>
          <div id="products">
            <p><strong>Why not match one of our <a href="" target="_blank" title="Portrait fragrances">Portrait fragrances</a> to your bouquet...</strong></p>
            <svg className="doubleline-decoration" viewBox="0 0 1400 40">
              <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
              <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
            </svg>
            <ul>
              {
                Object.keys(this.props.products)
                      .map(this.renderProduct)
              }
            </ul>
            <svg className="doubleline-decoration reflected" viewBox="0 0 1400 40">
              <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
              <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
            </svg>
            <p><strong>Alternatively you can find your perfect Penhaligon's scent with our online <a href="" target="_blank" title="Fragrance Profiling Experience">Fragrance Profiling Experience</a></strong></p>
          </div>
        </div>
      </div>
    )
  }

  /* Animation */
  componentWillEnter(callback) {
    console.log("Success Will enter");

    let currentTarget = "#" + this.el.id;
    let dly = 2;

    TweenMax.set("#products", {autoAlpha:0}); // eslint-disable-line

    TweenMax.from(currentTarget, 0.5, { // eslint-disable-line
      autoAlpha:0,
      onComplete:function () {
        TweenMax.to("#thank-you", 0.6, {autoAlpha:0, delay:dly}); // eslint-disable-line
        TweenMax.to("#products", 0.6, {autoAlpha:1, delay:dly}); // eslint-disable-line
        callback();
      }
    });
  }

  componentWillAppear(callback) {
    console.log("Success Will appear");
  }


}
