import { gsap } from 'gsap';

export default function FadeOut(el, callback, dur) {
  let tl = gsap.timeline();
  let trg = "#" + el;
  let d = dur || 0.5;

  tl.to(trg, {
    autoAlpha:0,
    duration: d
  });
  if(callback) {
    tl.call(callback);
  }

  return tl;
}
