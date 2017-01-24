export default function PeopleIn() {
  let tl = new TimelineMax(); // eslint-disable-line

  tl.from(["#man","#lady"], 1, {autoAlpha:0}, "People")
    .from("#man", 2, {xPercent:10}, "People")
    .from("#lady", 2, {xPercent:-10}, "People")

  return tl;
}
