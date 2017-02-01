import React, { Component } from 'react';
import FadeOut from '../animation/FadeOut';
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
          <p>Buy now</p>
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
            <p><strong>Why not match one of our Penhaligon’s <a href="https://www.penhaligons.com/penhaligons-portraits/?utm_source=Language%20of%20Flowers&utm_medium=Referral&utm_content=Website" target="_blank" title="Portraits Fragrances">Portraits Collection</a> to your bouquet...</strong></p>
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
            <p><strong>Alternatively you can find your perfect Penhaligon's scent with our online <a href="http://profiling.penhaligons.com/?utm_source=Language%20of%20Flowers&utm_medium=Referral&utm_content=Website" target="_blank" title="Fragrance Profiling Experience">Fragrance Profiling Experience</a></strong></p>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{ __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1799154187025873');
            fbq('track', 'CompleteRegistration');
          `}} />
          <img className="tracking-pixel" height="1" width="1" src="https://www.facebook.com/tr?id=1799154187025873&ev=CompleteRegistration&noscript=1"/>
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

    tl.add("Crossfade", "+=2")
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
    this.animateIn(callback, 0.5);
  }


  componentWillLeave(callback) {
    FadeOut(this.el.id, callback);
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
