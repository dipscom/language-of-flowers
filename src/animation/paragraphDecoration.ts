import gsap from "gsap";

// Same choppy, stepped rhythm as the logo reveal.
const DURATION = 0.9;
const FRAMES = 6;
// The reflected copy trails the other one slightly.
const REFLECTED_DELAY = 0.1;
// Each half is clipped away from the centre, where it first appears.
const HIDDEN = {
  left: "inset(0% 0% 0% 100%)",
  right: "inset(0% 100% 0% 0%)",
};
const SHOWN = "inset(0% 0% 0% 0%)";

// Seconds a decoration should trail the others when they start together.
export function paragraphDecorationDelay(element: Element) {
  return element.hasAttribute("data-reflected") ? REFLECTED_DELAY : 0;
}

// Reveals a ParagraphDecoration from its centre outwards, horizontally only.
// `hide()` must run before it is shown and `play()` returns the timeline.
export default function createParagraphDecorationReveal(element: Element) {
  const left = element.querySelectorAll('[data-side="left"]');
  const right = element.querySelectorAll('[data-side="right"]');

  return {
    hide() {
      gsap.set(left, { clipPath: HIDDEN.left });
      gsap.set(right, { clipPath: HIDDEN.right });
    },

    play() {
      return gsap
        .timeline({
          defaults: { duration: DURATION, ease: `steps(${FRAMES})` },
          onComplete: () => {
            gsap.set([left, right], { clearProps: "clipPath" });
          },
        })
        .to(left, { clipPath: SHOWN })
        .to(right, { clipPath: SHOWN }, 0);
    },
  };
}
