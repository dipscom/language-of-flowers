export default function FadeOut(el, callback, dur) {
  let tl = new TimelineMax(); // eslint-disable-line
  let trg = "#" + el;
  let d = dur || 0.5;

  // Really it should be the element animating in that is absolutely positioned. That way, the flow is preserved while the old elements move out
  
  // Are we in landscape mode?
  if(window.innerHeight < window.innerWidth){
    tl.set(trg, {
      position:"absolute"
    });
  }

  tl.to(trg, d, {
    autoAlpha:0
  });
  if(callback) {
    tl.addCallback(callback);
  }

  return tl;
}
