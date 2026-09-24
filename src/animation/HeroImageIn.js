import { gsap } from 'gsap';

export default function HeroImageIn(delay) {
  let tl = gsap.timeline({delay:delay || 0});

  gsap.set("#hero-image", {position:"absolute"});

  tl.fromTo("#hero-image", {
    autoAlpha: 0,
    scale: 0.95,
  }, {
    autoAlpha: 1,
    scale: 1,
    ease: "power1.inOut",
    duration: 3,
    onStart:function () {
      gsap.set("#hero-image", {position:"relative"});
      document.getElementById("hero-image")?.classList.remove("hide-portrait");
    }
  });
  return tl
}
