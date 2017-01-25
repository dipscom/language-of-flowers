export default function FadeOut(el, callback, dur) {
  let tl = new TimelineMax(); // eslint-disable-line
  let trg = "#" + el;
  let d = dur || 0.5;

  tl.to(trg, d, {
    autoAlpha:0
  });
  if(callback) {
    tl.addCallback(callback);
  }

  return tl;
}
