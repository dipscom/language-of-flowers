import gsap from "gsap";

export interface OverlayPieces {
  show(): void;
  hide(): void;
  // Jumps to the shown or the hidden state, without animating.
  set(visible: boolean): void;
}

// Every piece of the overlay (the flowers and the characters), which are only
// on screen with the Introduction. Built hidden: each piece starts in its
// off-screen state, and hiding plays the entrance backwards.
export function createOverlayPieces(scope: Element): OverlayPieces {
  const el = (name: string) =>
    scope.querySelector<HTMLElement>(`[data-overlay="${name}"]`);

  const tl = gsap
    .timeline({
      paused: true,
      defaults: { duration: 1.2, ease: "back.out(1)" },
    })
    .from(el("flowers-bottom"), { yPercent: 100 })
    .from(
      el("flowers-top-left"),
      { yPercent: -100, xPercent: -100 },
      "<=+0.1",
    )
    .from(
      el("flowers-top-right"),
      { yPercent: -100, xPercent: 100 },
      "<=+0.1",
    )
    .from(el("flowers-mid-left"), { xPercent: -100 }, "<=+0.1")
    .from(el("flowers-bottom-right"), { xPercent: 100 }, "<=+0.1")
    .from(
      el("peacock"),
      { yPercent: 100, xPercent: -20, autoAlpha: 0 },
      "<=+0.1",
    )
    .from(
      el("stag"),
      { yPercent: 100, xPercent: 20, autoAlpha: 0 },
      "<=+0.1",
    )
    .from(
      el("man"),
      { xPercent: 50, autoAlpha: 0, ease: "power4.out" },
      "<=+0.1",
    )
    .from(
      el("lady"),
      { xPercent: -50, autoAlpha: 0, ease: "power4.out" },
      "<=+0.1",
    );

  return {
    show: () => {
      tl.play();
    },
    hide: () => {
      tl.reverse();
    },
    set: (visible) => {
      tl.progress(visible ? 1 : 0).pause();
    },
  };
}

// Returns a timeline meant to be added to the initial load: it shows the
// overlay, then calls `onPieces` to bring the pieces in if they belong on the
// page.
export default function createOverlayReveal(
  scope: Element,
  onPieces: () => void,
) {
  // The overlay is hidden by initialLoad until this point; the pieces have
  // already been moved off-screen, so it can be shown straight away.
  return gsap
    .timeline()
    .set(scope.querySelector('[data-load="overlay"]'), { autoAlpha: 1 })
    .call(onPieces);
}
