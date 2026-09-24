import { gsap } from 'gsap';

export default function BackgroundIn() {
  let tl = gsap.timeline();

  tl.from(["#background", ".cloud"], {
    autoAlpha: 0,
    ease: "power2.inOut",
    duration: 1
  }, 0.3)
    .to("#forest figure", { scale: 1.025, duration: 1.5 }, 0)

    .from("#paper", { autoAlpha: 0, duration: 1 })

    .add("PaperLines", "-=0.5")
    .from(".straight-segment", {
      drawSVG: "50% 50%",
      ease: "power1.inOut",
      duration: 0.8
    }, "PaperLines")
    .from(["#line-top .segment", ".corner"], {
      drawSVG: 0,
      ease: "power1.inOut",
      duration: 0.8
    }, "PaperLines")


  return tl;
}
