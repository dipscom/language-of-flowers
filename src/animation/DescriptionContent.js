export default function DescriptionContent(el, callback) {
  let tl = new TimelineMax(); // eslint-disable-line

  // tl.from("#description", 1, {autoAlpha:0, onComplete:callback})
  tl.staggerFrom(["hr", "h1", "p"], 1.5, {
      autoAlpha:0,
      ease:"Power1.easeOut"
    }, 0.3, "StaggerContent")
    .staggerFrom(["hr", "h1", "p"], 1.5, {
      y:10,
      ease:"Power4.easeOut"
    }, 0.3, "StaggerContent")
    .from(".button", 0.5, {
      autoAlpha:0,
      ease:"Power4.easeInOut",
      onStart:callback
    }, "-=0.5")

  return tl;
}
