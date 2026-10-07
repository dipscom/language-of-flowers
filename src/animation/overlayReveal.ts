import gsap from "gsap";

// Returns a timeline meant to be added to the initial load.
export default function createOverlayReveal(scope: Element) {
  const el = (name: string) =>
    scope.querySelector<HTMLElement>(`[data-overlay="${name}"]`);

  const flowers = {
    topLeft: el("flowers-top-left"),
    topRight: el("flowers-top-right"),
    midLeft: el("flowers-mid-left"),
    bottom: el("flowers-bottom"),
    bottomRight: el("flowers-bottom-right"),
  };
  const characters = {
    man: el("man"),
    lady: el("lady"),
    peacock: el("peacock"),
    stag: el("stag"),
  };

  const tl = gsap.timeline({
    defaults: { duration: 1.2, ease: "back.out(1)" },
  });

  // The overlay is hidden by initialLoad until this point; the tweens below
  // have already moved each piece off-screen, so it can be shown straight away.
  tl.set(scope.querySelector('[data-load="overlay"]'), { autoAlpha: 1 })
    .from(flowers.bottom, {
      yPercent: 100,
    })
    .from(
      flowers.topLeft,
      {
        yPercent: -100,
        xPercent: -100,
      },
      "<=+0.1",
    )
    .from(
      flowers.topRight,
      {
        yPercent: -100,
        xPercent: 100,
      },
      "<=+0.1",
    )
    .from(
      flowers.midLeft,
      {
        xPercent: -100,
      },
      "<=+0.1",
    )
    .from(
      flowers.bottomRight,
      {
        xPercent: 100,
      },
      "<=+0.1",
    )
    .from(
      characters.peacock,
      {
        yPercent: 100,
        xPercent: -20,
        autoAlpha: 0,
      },
      "<=+0.1",
    )
    .from(
      characters.stag,
      {
        yPercent: 100,
        xPercent: 20,
        autoAlpha: 0,
      },
      "<=+0.1",
    )
    .from(
      characters.man,
      {
        xPercent: 50,
        autoAlpha: 0,
        ease: "power4.out",
      },
      "<=+0.1",
    )
    .from(
      characters.lady,
      {
        xPercent: -50,
        autoAlpha: 0,
        ease: "power4.out",
      },
      "<=+0.1",
    );

  return tl;
}
