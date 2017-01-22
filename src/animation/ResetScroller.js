export default function ResetScroller(el, delay) {
  let trg = "#" + el;

  return TweenMax.to(trg + " > div", 0.5, {scrollTo:0, delay:delay || 0}); // eslint-disable-line
}
