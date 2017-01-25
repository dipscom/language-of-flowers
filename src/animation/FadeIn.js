export default function FadeIn(el, delay, callback, dur) {
  let tl = new TimelineMax(); // eslint-disable-line
  let trg = "#" + el;
  let d = dur || 0.5;
  let dly = delay || 0;

  // Are we in landscape mode?
  if(window.innerHeight < window.innerWidth){
    tl.set(trg, {
      position:"absolute"
    });
  }

  tl.from(trg, d, { // eslint-disable-line
    autoAlpha:0,
    clearProps:"all"
  }, dly);

  if(callback) {
    tl.addCallback(callback);
  }

  return tl;
}
