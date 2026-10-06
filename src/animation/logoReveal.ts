import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

// Same choppy rhythm as the paper: few frames, held for a while.
const FADE_DURATION = 0.6;
const FADE_FRAMES = 3;
// Delay between sections; well under FADE_DURATION so they overlap.
const FADE_STAGGER = 0.25;
const DRAW_DURATION = 1.6;
const DRAW_FRAMES = 8;
// Each segment is drawn slightly past its end so no tip is left bare.
const OVERSHOOT = 0.05;
const SECTIONS = ["the", "language", "of", "flowers"];

const percent = (fraction: number) => `${(fraction * 100).toFixed(1)}%`;

// A segment with from > to is drawn backwards, from its end towards its start.
function drawn(from: number, to: number, overshoot = 0) {
  if (from <= to)
    return `${percent(from)} ${percent(Math.min(1, to + overshoot))}`;
  return `${percent(Math.max(0, to - overshoot))} ${percent(from)}`;
}

// Reveals the static logo (see MainLogo.tsx): its four text sections fade in
// one after another in stop-motion, while every decorative line is drawn
// by stroking its mask. `hide()` must run before the logo is shown and
// `play()` returns the timeline. Does nothing when the static logo isn't
// rendered, i.e. on every route but the Introduction.
export default function createLogoReveal(scope: Element) {
  const logo = scope.querySelector<SVGSVGElement>('[data-load="logo"] svg');
  const sections = SECTIONS.map((name) =>
    logo?.querySelector<SVGGElement>(`[data-logo="${name}"]`),
  ).filter((section) => section != null);
  const strokes = Array.from(
    logo?.querySelectorAll<SVGPathElement>("[data-logo-stroke]") ?? [],
  ).map((element) => ({
    element,
    from: Number(element.dataset.from),
    to: Number(element.dataset.to),
  }));
  const isRendered = () => !!logo && logo.getClientRects().length > 0;

  const showAll = () => {
    gsap.set(sections, { autoAlpha: 1 });
    gsap.set(
      strokes.map(({ element }) => element),
      { drawSVG: "0% 100%" },
    );
  };

  return {
    hide() {
      if (!isRendered()) return;
      gsap.set(sections, { autoAlpha: 0 });
      for (const { element, from } of strokes) {
        gsap.set(element, { drawSVG: drawn(from, from) });
      }
    },

    play() {
      const timeline = gsap.timeline({ onComplete: showAll });
      if (!isRendered()) return timeline;

      timeline.to(sections, {
        autoAlpha: 1,
        duration: FADE_DURATION,
        ease: `steps(${FADE_FRAMES})`,
        stagger: FADE_STAGGER,
      });
      for (const { element, from, to } of strokes) {
        timeline.to(
          element,
          {
            drawSVG: drawn(from, to, OVERSHOOT),
            duration: DRAW_DURATION,
            ease: `steps(${DRAW_FRAMES})`,
          },
          0,
        );
      }
      return timeline;
    },
  };
}
