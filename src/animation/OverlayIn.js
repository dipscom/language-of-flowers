export default function OverlayIn() {
  let tl = new TimelineMax(); // eslint-disable-line

  let fadeIn = function(el, opts = {xP:0, yP:0} ) {
    return TweenMax.from(el, 2, {xPercent:opts.xP, yPercent:opts.yP, autoAlpha:0, ease:Elastic.easeOut.config(0.6)}); // eslint-disable-line
  }

  tl.add(fadeIn('#flowersBottom', {xP:0, yP:10}), "Foliage")
  .add(fadeIn('#flowersBottomRight', {xP:30, yP:10}), "Foliage+=0.1")
  .add(fadeIn('#flowersMidLeft', {xP:-10, yP:1}), "Foliage+=0.13")
  .add(fadeIn('#flowersTopLeft', {xP:-10, yP:-10}), "Foliage+=0.2")
  .add(fadeIn('#flowersTopRight', {xP:10, yP:-10}), "Foliage+=0.23")
  .add(fadeIn('#peacock', {xP:-5, yP:10}), "Foliage+=0.3")
  .add(fadeIn('#stag', {xP:5, yP:10}), "Foliage+=0.3")

  return tl;
}
