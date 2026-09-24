import { gsap } from 'gsap';

export default function OverlayIn() {
  let tl = gsap.timeline();

  let fadeOut = function(el, opts = {xP:0, yP:0} ) {
    return gsap.to(el, {xPercent:opts.xP, yPercent:opts.yP, autoAlpha:0, ease:"back.in(3)", duration: 1});
  }

  tl.add(fadeOut('#flowersBottom', {xP:0, yP:10}), "Foliage")
  .add(fadeOut('#flowersBottomRight', {xP:30, yP:10}), "Foliage")
  .add(fadeOut('#flowersMidLeft', {xP:-10, yP:1}), "Foliage")
  .add(fadeOut('#flowersTopLeft', {xP:-10, yP:-10}), "Foliage")
  .add(fadeOut('#flowersTopRight', {xP:10, yP:-10}), "Foliage")
  .add(fadeOut('#peacock', {xP:-5, yP:10}), "Foliage")
  .add(fadeOut('#stag', {xP:5, yP:10}), "Foliage")
  .add(fadeOut('#man', {xP:10, yP:0}), "Foliage")
  .add(fadeOut('#lady', {xP:-10, yP:0}), "Foliage")

  return tl;
}
