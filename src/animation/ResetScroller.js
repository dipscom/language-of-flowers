export default function ResetScroller(el, delay) {
  let trg = "#" + el;

  return TweenMax.set(trg + " > div", {scrollTo:0, delay:delay || 0}); // eslint-disable-line
}
