export default function BackgroundIn() {
  let tl = new TimelineMax(); // eslint-disable-line

  tl.from(["#background",".cloud"], 1, {
    autoAlpha:0,
    ease:"Power2.easeInOut"
  }, 0.3)
    .to("#forest figure", 1.5, {scale:1.025}, 0)

    .from("#paper", 1, {autoAlpha:0})

    .add("PaperLines", "-=0.5")
    .from(".straight-segment", 0.8, {
      drawSVG: "50% 50%",
      ease: "Power1.easeInOut"
    }, "PaperLines")
    .from(["#line-top .segment",".corner"], 0.8, {
      drawSVG: 0,
      ease: "Power1.easeInOut"
    }, "PaperLines")


  return tl;
}
