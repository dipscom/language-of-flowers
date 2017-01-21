export default function IntroductionContent(el, callback) {
  let tl = new TimelineMax(); // eslint-disable-line

  tl.staggerFrom(["#penhaligons-logo", "hr", "h1", "p", "strong"], 1.5, {
      autoAlpha:0,
      ease:"Power1.easeOut"
    }, 0.3, "StaggerContent")
    .staggerFrom(["#penhaligons-logo", "hr", "h1", "p", "strong"], 1.5, {
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
