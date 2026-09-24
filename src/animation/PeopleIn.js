import { gsap } from 'gsap';

export default function PeopleIn() {
  let tl = gsap.timeline();

  tl.from(["#man","#lady"], {autoAlpha:0, duration: 1}, "People")
    .from("#man", {xPercent:10, duration: 2}, "People")
    .from("#lady", {xPercent:-10, duration: 2}, "People")

  return tl;
}
