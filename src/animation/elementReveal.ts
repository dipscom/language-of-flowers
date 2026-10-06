import gsap from "gsap";

// Same choppy, stepped rhythm as the logo reveal.
export const FADE_DURATION = 0.6;
export const FADE_FRAMES = 3;
// Elements rise this far (a share of their own height) as they fade in.
export const RISE = 20;
const STAGGER = 0.3;

export function hideRisen(targets: gsap.TweenTarget) {
  gsap.set(targets, { autoAlpha: 0, yPercent: RISE });
}

// Fades the targets in one after another, rising into place, and hands each
// one back to the stylesheet as soon as it is done. Clearing them all together
// at the very end would make the ones that finished earlier visibly jump
// (their text is re-rendered) when the last one stops. `force3D: false` keeps
// them off their own compositing layer, which would re-render them again when
// it ends.
export function playRisen(targets: Element[], stagger: number) {
  const timeline = gsap.timeline();
  targets.forEach((target, index) => {
    timeline.to(
      target,
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: FADE_DURATION,
        ease: `steps(${FADE_FRAMES})`,
        force3D: false,
        onComplete: () => {
          gsap.set(target, { clearProps: "opacity,visibility,transform" });
        },
      },
      index * stagger,
    );
  });
  return timeline;
}

// Fades whole elements in one after another. `hide()` must run before they are
// shown and `play()` returns the timeline.
export default function createElementReveal(elements: Element[]) {
  return {
    hide: () => hideRisen(elements),
    play: () => playRisen(elements, STAGGER),
  };
}
