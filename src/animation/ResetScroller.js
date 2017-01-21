export default function ResetScroller(el, delay) {
  let trg = "#" + el.id;

  return TweenMax.set(trg + " > div", {scrollTo:0}); // eslint-disable-line
}
