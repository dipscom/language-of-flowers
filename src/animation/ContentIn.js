import { gsap } from 'gsap';

export default function DescriptionContent(el, callback) {
  let tl = gsap.timeline();
  let trg = "#" + el.id;
  let dur = 1.5;

  if(trg === "#introduction") {
    tl.from("#penhaligons-logo", {autoAlpha:0, ease:"power1.out", duration: dur}, "StaggerContent" )
  }
  tl.from([trg+" hr", trg+" h1", trg+" p"], {
      autoAlpha:0,
      ease:"power1.out",
      duration: dur,
      stagger: 0.3
    }, "StaggerContent")
    .from([trg+" hr", trg+" h1", trg+" p"], {
      y:10,
      ease:"power4.out",
      duration: dur,
      stagger: 0.3
    }, "StaggerContent")
    .from(trg+" .button", {
      autoAlpha:0,
      ease:"power4.inOut",
      duration: 0.5,
      onStart:callback
    }, "-=0.5")

  return tl;
}
