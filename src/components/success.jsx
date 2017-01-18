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
            <p>Your encoded bouquet has been sent.</p>
          </div>
          <div id="products">
            <p>Why not match one of our <a href="" target="_blank" title="Portrait fragrances">Portrait fragrances</a> to your bouquet...</p>
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
            <p>Alternatively you can find your perfect Penhaligon's scent with our online <a href="" target="_blank" title="Fragrance Profiling Experience">Fragrance Profiling Experience</a></p>
          </div>
        </div>
      </div>
    )
  }
}
