import React, { Component } from 'react';
import AnimateOut from '../animation/AnimateOut';
import CloudsLoop from '../animation/CloudsLoop';



export default class Success extends Component{
  constructor() {
    super();
    this.renderProduct = this.renderProduct.bind(this);

    this.latestKnownScrollY = 0;
    this.ticking = false;
    this.onScroll = this.onScroll.bind(this);
    this.update = this.update.bind(this);
    this.logoTl = null;

  }
  componentDidMount() {
    this.logoTl = TweenMax.to("#lof-logo", 1, {autoAlpha:0, paused:true, ease:"Linear.easeNone"}); // eslint-disable-line
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
        <div id="scroller" onScroll={this.onScroll}>
          <div id="thank-you">
            <header>
              <h1>Thank You!</h1>
              {/*<svg className="doubleline-decoration" viewBox="0 0 1400 40">
                <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
                <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
              </svg>*/}
              <hr />
            </header>
            <p><strong>Your encoded bouquet has been sent.</strong></p>
          </div>
          <div id="products">
            <p><strong>Why not match one of our <a href="https://www.penhaligons.com/a-very-british-affair/" target="_blank" title="Portrait fragrances">Portrait fragrances</a> to your bouquet...</strong></p>
            {/*<svg className="doubleline-decoration" viewBox="0 0 1400 40">
              <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
              <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
            </svg>*/}
            <hr />
            <ul>
              {
                Object.keys(this.props.products)
                      .map(this.renderProduct)
              }
            </ul>
            {/*<svg className="doubleline-decoration reflected" viewBox="0 0 1400 40">
              <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
              <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
            </svg>*/}
            <hr className="reflected" />
            <p><strong>Alternatively you can find your perfect Penhaligon's scent with our online <a href="https://profiling.penhaligons.com/" target="_blank" title="Fragrance Profiling Experience">Fragrance Profiling Experience</a></strong></p>
          </div>
        </div>
      </div>
    )
  }

  /* Animation */
  animateIn(callback, delay) {
    let tl = new TimelineMax({delay:delay || 0, onStart:callback}); // eslint-disable-line
    let currentTarget = "#" + this.el.id;
    let dur = 1.6;

    // Make sure the logo is centered on its x-axis
    tl.set("#lof-logo", {xPercent:-50});
    // And that the products are hidden
    tl.set("#products", {autoAlpha:0});

    tl.from(currentTarget, dur, {autoAlpha:0});

    tl.add("Crossfade", "+=3")
      .to("#thank-you", dur, {autoAlpha:0, ease:"Power2.easeInOut"})
      .to("#products", dur, {autoAlpha:1, ease:"Power2.easeInOut"}, "-=0.6")

  }

  componentWillAppear(callback) {
    // console.log("Success Will appear");
    this.animateIn(callback);

    // Clouds infinite loop
    CloudsLoop();

  }

  componentWillEnter(callback) {
    // console.log("Success Will enter");
    this.animateIn(callback);
  }


  componentWillLeave(callback) {
    AnimateOut(this.el, callback);
  }

  onScroll() {
    let scrollY = document.getElementById('scroller').scrollTop;
    this.latestKnownScrollY = scrollY;
    this.requestTick();
  }

  requestTick() {
    if(!this.ticking) {
      requestAnimationFrame(this.update);
    }
  }

  update() {
    this.logoTl.progress(this.latestKnownScrollY/100)
    this.ticking = false;
  }


}
