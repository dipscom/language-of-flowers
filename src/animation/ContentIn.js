export default function DescriptionContent(el, callback) {
  let tl = new TimelineMax(); // eslint-disable-line
  let trg = "#" + el.id;
  let dur = 1.5;

  if(trg === "#introduction") {
    tl.from("#penhaligons-logo", dur, {autoAlpha:0, ease:"Power1.easeOut"}, "StaggerContent" )
  }
  tl.staggerFrom([trg+" hr", trg+" h1", trg+" p"], dur, {
      autoAlpha:0,
      ease:"Power1.easeOut"
    }, 0.3, "StaggerContent")
    .staggerFrom([trg+" hr", trg+" h1", trg+" p"], dur, {
      y:10,
      ease:"Power4.easeOut"
    }, 0.3, "StaggerContent")
    .from(trg+" .button", 0.5, {
      autoAlpha:0,
      ease:"Power4.easeInOut",
      onStart:callback
    }, "-=0.5")

  return tl;
}
