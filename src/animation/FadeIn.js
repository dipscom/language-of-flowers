export default function FadeIn(el, delay, callback, dur) {
  let tl = new TimelineMax(); // eslint-disable-line
  let trg = "#" + el;
  let d = dur || 0.5;
  let dly = delay || 0;

  tl.from(trg, d, { // eslint-disable-line
    autoAlpha:0
  }, dly);

  if(callback) {
    tl.addCallback(callback);
  }

  return tl;
}
