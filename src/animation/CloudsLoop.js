export default function CloudsLoop() {
  let tl = new TimelineMax(); // eslint-disable-line

  let paperWidth = document.getElementById("paper").getBoundingClientRect().width * 1.5;

  let cloudMove = function(el, dur) {
    return TweenMax.to(el, dur, {// eslint-disable-line
      x:"+="+paperWidth,
      modifiers: {
        x:function(x) {
          return x % paperWidth
        }
      },
      repeat: -1,
      ease: "Linear.easeNone"
    });
  }

  tl.set(".cloud", {// eslint-disable-line
    xPercent:-50,
    x:function(i) {
      return (i+1) * paperWidth/3;
    }
  }, 0)
    .add(cloudMove("#cloud1", paperWidth*0.4), 0)
    .add(cloudMove("#cloud2", paperWidth*0.09), 0)

  return tl;
}
