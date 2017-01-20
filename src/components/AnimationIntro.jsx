import React, { Component } from 'react';

export var AnimationIntro = WrappedComponent => class extends Component {
  componentWillAppear(callback) {

    // Hide the LOF logo initially
    TweenMax.set("#lof-logo", {autoAlpha:0}); // eslint-disable-line
    // Makes sure the page is always on the top
    TweenMax.set(".page > div", {scrollTo:0}); // eslint-disable-line

    // Clouds infinit loop
    // this.animateClouds();


    // Intro animation
    let tl = new TimelineMax(); // eslint-disable-line

    // Background section
    tl.from(["#background","#paper",".cloud"], 1, {
      autoAlpha:0,
      ease:"Power2.easeInOut"
    }, 0.3)
      .to("#forest figure", 1.5, {scale:1.025}, 0)

      .add("PaperLines", "-=0.5")
      .from(".straight-segment", 0.8, {
        drawSVG: "50% 50%",
        ease: "Power1.easeInOut"
      }, "PaperLines")
      .from(["#line-top .segment",".corner"], 0.8, {
        drawSVG: 0,
        ease: "Power1.easeInOut"
      }, "PaperLines")



    // Overlay section
    .add(this.fadeIn('#flowersBottom', {xP:0, yP:10}), "Foliage")
    .add(this.fadeIn('#flowersBottomRight', {xP:30, yP:10}), "Foliage+=0.1")
    .add(this.fadeIn('#flowersMidLeft', {xP:-10, yP:1}), "Foliage+=0.13")
    .add(this.fadeIn('#flowersTopLeft', {xP:-10, yP:-10}), "Foliage+=0.2")
    .add(this.fadeIn('#flowersTopRight', {xP:10, yP:-10}), "Foliage+=0.23")
    .add(this.fadeIn('#peacock', {xP:-5, yP:10}), "Foliage+=0.3")
    .add(this.fadeIn('#stag', {xP:5, yP:10}), "Foliage+=0.3")



    // Introduction section
    .add(this.contentAnimation(callback), "-=1.5")
    // .call(this.contentAnimation, [callback], this, "-=1.5")

    .add("People", "-=1")
    .from(["#man","#lady"], 1, {autoAlpha:0}, "People")
    .from("#man", 1, {xPercent:10}, "People")
    .from("#lady", 1, {xPercent:-10}, "People")

  }

  contentAnimation(callback) {
    let tl = new TimelineMax(); // eslint-disable-line

    tl.staggerFrom(["#penhaligons-logo", "hr", "h1", "p", "strong"], 1.5, {
        autoAlpha:0,
        ease:"Power1.easeOut"
      }, 0.3, "StaggerContent")
      .staggerFrom(["#penhaligons-logo", "hr", "h1", "p", "strong"], 1.5, {
        y:10,
        ease:"Power4.easeOut"
      }, 0.3, "StaggerContent")
      .from(".button", 0.5, {
        autoAlpha:0,
        ease:"Power4.easeInOut",
        onStart:callback
      })

    return tl;
  }

  fadeIn(el, opts = {xP:0, yP:0} ) {
    return TweenMax.from(el, 2, {xPercent:opts.xP, yPercent:opts.yP, autoAlpha:0, ease:Elastic.easeOut.config(0.4)}); // eslint-disable-line
  }



  animateClouds() {
    const paperWidth = document.getElementById("paper").getBoundingClientRect().width * 1.5;

    TweenMax.set(".cloud", {// eslint-disable-line
      xPercent:-50,
      x:function(i) {
        return (i+1) * paperWidth/3;
      }
    });


    TweenMax.to("#cloud1", paperWidth*0.4, {// eslint-disable-line
      x:"+="+paperWidth,
      modifiers: {
        x:function(x) {
          return x % paperWidth
        }
      },
      repeat: -1,
      ease: "Linear.easeNone"
    })
    TweenMax.to("#cloud2", paperWidth*0.09, {// eslint-disable-line
      x:"+="+paperWidth,
      modifiers: {
        x:function(x) {
          return x % paperWidth
        }
      },
      repeat: -1,
      ease: "Linear.easeNone"
    })
  }

  animateOut(callback) {
    console.log("Call me");
    TweenMax.to("#introduction", 0.5, { // eslint-disable-line
      autoAlpha:0,
      ease: "Power4.easeInOut",
      onComplete:callback
    });
  }

  componentWillEnter(callback) {
    // Show the spare logo in the backgtround component
    TweenMax.to("#lof-logo", 0.5, {autoAlpha:0, ease: "Power4.easeInOut"}); // eslint-disable-line
    // Open space for the logo
    TweenMax.to("#line-top > .segment", 0.8, { // eslint-disable-line
      drawSVG: "0% 100%",
      ease: "Power4.easeInOut"
    });

    let tl = new TimelineMax(); // eslint-disable-line

    tl.add(this.contentAnimation(callback))
  }

  componentWillLeave(callback) {
    this.animateOut(callback);
  }

  render() {
    return <WrappedComponent />
  }
}
