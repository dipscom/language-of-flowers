export default function OverlayIn() {
  let tl = new TimelineMax(); // eslint-disable-line

  let fadeOut = function(el, opts = {xP:0, yP:0} ) {
    return TweenMax.to(el, 1, {xPercent:opts.xP, yPercent:opts.yP, autoAlpha:0, ease:Back.easeIn.config(3)}); // eslint-disable-line
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
