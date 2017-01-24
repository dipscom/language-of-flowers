export default function HeroImageIn(callback,delay) {
  let tl = new TimelineMax({delay:delay || 0, onComplete:callback}); // eslint-disable-line

  TweenMax.set("#hero-image", {position:"absolute", className:"-=hide-portrait"}); // eslint-disable-line

  tl.fromTo("#hero-image", 3, {
    autoAlpha: 0,
    scale: 0.95,
  }, {
    autoAlpha: 1,
    scale: 1,
    ease: "power1.easeInOut",
    onStart:function () {
      TweenMax.set("#hero-image", {position:"relative"}); // eslint-disable-line
    }
  });
  return tl
}
