import { gsap } from 'gsap';

export default function ResetScroller(el, delay) {
  let trg = "#" + el;
  return gsap.set(trg + " > div", {scrollTo:0, delay:delay || 0});
}
