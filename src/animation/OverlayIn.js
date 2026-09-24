import { gsap } from 'gsap';

export default function OverlayIn() {
  let tl = gsap.timeline();

  let fadeIn = function(el, opts = {xP:0, yP:0} ) {
    return gsap.fromTo(el, {xPercent:opts.xP, yPercent:opts.yP, autoAlpha:0}, {xPercent:0, yPercent:0, autoAlpha:1, ease:"back.out(2)", duration: 2});
  }

  tl.add(fadeIn('#flowersBottom', {xP:0, yP:10}), "Foliage")
  .add(fadeIn('#flowersBottomRight', {xP:30, yP:10}), "Foliage+=0.25")
  .add(fadeIn('#flowersMidLeft', {xP:-10, yP:1}), "Foliage+=0.25")
  .add(fadeIn('#flowersTopLeft', {xP:-10, yP:-10}), "Foliage+=0.5")
  .add(fadeIn('#flowersTopRight', {xP:10, yP:-10}), "Foliage+=0.5")
  .add(fadeIn('#peacock', {xP:-5, yP:10}), "Foliage+=0.75")
  .add(fadeIn('#stag', {xP:5, yP:10}), "Foliage+=0.7")

  return tl;
}
