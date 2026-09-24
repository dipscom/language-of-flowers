import { gsap } from 'gsap';

export default function FadeIn(el, delay, callback, dur) {
  let tl = gsap.timeline();
  let trg = "#" + el;
  let d = dur || 0.5;
  let dly = delay || 0;

  // Are we in landscape mode?
  if(window.innerHeight < window.innerWidth){
    tl.set(trg, {
      position:"absolute"
    });
  }

  tl.from(trg, {
    autoAlpha:0,
    clearProps:"all",
    duration: d
  }, dly);

  if(callback) {
    tl.call(callback);
  }

  return tl;
}
