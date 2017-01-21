export default function BackgroundIn(el, callback) {
  // TODO Throw an error if no element or callback is given
  
  return TweenMax.to(el, 0.5, { // eslint-disable-line
    autoAlpha:0,
    ease: "Power4.easeInOut",
    onComplete:callback
  });
}
