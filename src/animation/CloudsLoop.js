import { gsap } from 'gsap';

export default function CloudsLoop() {
  let tl = gsap.timeline();

  let paperWidth = document.getElementById("paper").getBoundingClientRect().width * 1.5;

  let cloudMove = function(el, dur) {
    let trg = document.getElementById(el);
    let distance = paperWidth + (trg.offsetWidth/2);
    return gsap.to("#" + el, {
      x: "+=" + distance,
      modifiers: {
        x: function(x) {
          return x % distance;
        }
      },
      repeat: -1,
      ease: "none",
      duration: dur
    });
  }

  tl.set(".cloud", {
    xPercent: -100,
    x: function(i) {
      return (i+1) * paperWidth/3;
    }
  }, 0)
    .add(cloudMove("cloud1", paperWidth*0.4), 0)
    .add(cloudMove("cloud2", paperWidth*0.09), 0)

  return tl;
}
