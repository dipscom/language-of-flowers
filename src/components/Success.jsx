import React, { Component } from "react";
import { gsap } from "gsap";
import FadeOut from "../animation/FadeOut";
import CloudsLoop from "../animation/CloudsLoop";

export default class Success extends Component {
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
    this.logoTl = gsap.to("#lof-logo", {
      autoAlpha: 0,
      paused: true,
      ease: "none",
      duration: 1,
    });
  }
  renderProduct(key) {
    const product = this.props.products[key];
    const styles = {
      backgroundImage: "url(/images/products/" + key + ".png)",
    };
    return (
      <li key={key}>
        <a href={product.link} target="_blank" title={product.name}>
          <figure style={styles}></figure>
          <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Buy now</p>
          </div>
        </a>
      </li>
    );
  }
  render() {
    return (
      <div
        id="success"
        className="page"
        ref={(el) => {
          this.el = el;
        }}
      >
        <div id="scroller" onScroll={this.onScroll}>
          <div id="thank-you">
            <header>
              <h1>Thank You!</h1>
              <hr />
            </header>
            <p>
              <strong>Your encoded bouquet has been sent.</strong>
            </p>
          </div>
          <div id="products">
            <p>
              <strong>
                Why not match one of our
                <a href="#" target="_blank" title="Portraits Fragrances">
                  Portraits Collection
                </a>{" "}
                to your bouquet...
              </strong>
            </p>
            <hr />
            <ul>{Object.keys(this.props.products).map(this.renderProduct)}</ul>
            <hr className="reflected" />
            <p>
              <strong>
                Alternatively you can find your perfect scent with our online{" "}
                <a
                  href="#"
                  target="_blank"
                  title="Fragrance Profiling Experience"
                >
                  Fragrance Profiling Experience
                </a>
              </strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* Animation */
  animateIn(callback, delay) {
    let tl = gsap.timeline({ delay: delay || 0, onStart: callback });
    let currentTarget = "#" + this.el.id;
    let dur = 1.6;

    // Make sure the logo is centered on its x-axis
    tl.set("#lof-logo", { xPercent: -50 });
    // And that the products are hidden
    tl.set("#products", { autoAlpha: 0 });

    tl.from(currentTarget, { autoAlpha: 0, duration: dur });

    tl.add("Crossfade", "+=2")
      .to("#thank-you", { autoAlpha: 0, ease: "power2.inOut", duration: dur })
      .to(
        "#products",
        { autoAlpha: 1, ease: "power2.inOut", duration: dur },
        "-=0.6",
      );
  }

  animateAppear(callback) {
    this.animateIn(callback);

    // Clouds infinite loop
    CloudsLoop();
  }

  animateEnter(callback) {
    this.animateIn(callback, 0.5);
  }

  animateLeave(callback) {
    FadeOut(this.el.id, callback);
  }

  onScroll() {
    let scrollY = document.getElementById("scroller").scrollTop;
    this.latestKnownScrollY = scrollY;
    this.requestTick();
  }

  requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(this.update);
    }
  }

  update() {
    this.logoTl.progress(this.latestKnownScrollY / 100);
    this.ticking = false;
  }
}
