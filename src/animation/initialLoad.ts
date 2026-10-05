import gsap from "gsap";
import createForestReveal from "./forestReveal";

// Resolves once an <img> has loaded; a failed image must never block the page.
function imageReady(image: HTMLImageElement) {
  if (image.complete) return Promise.resolve();
  return new Promise<void>((resolve) => {
    image.addEventListener("load", () => resolve(), { once: true });
    image.addEventListener("error", () => resolve(), { once: true });
  });
}

interface InitialLoadOptions {
  scope: Element;
  onReady: () => void;
  contextSafe: <T extends (...args: never[]) => unknown>(fn: T) => T;
}

// Hides the page, waits for every asset, then reveals it back to front: the
// forest is printed onto its canvas, then the paper and decorations fade in.
// Returns a cleanup that stops a pending wait (StrictMode runs effects twice).
export default function initialLoad({
  scope,
  onReady,
  contextSafe,
}: InitialLoadOptions) {
  const forest = createForestReveal(
    scope.querySelector<HTMLCanvasElement>('canvas[data-load="forest"]')!,
  );
  const paper = '[data-load="paper"]';
  const decorations = '[data-load="overlay"] > img';
  let cancelled = false;

  // Both logo variants (static and link) are targeted; CSS shows only one.
  const logo = '[data-load="logo"]';
  const logoHidden = "inset(50% 0% 50% 0%)";
  const logoShown = "inset(0% 0% 0% 0%)";

  gsap.set([paper, decorations], { autoAlpha: 0 });
  gsap.set(logo, { clipPath: logoHidden });

  const reveal = contextSafe(() => {
    onReady();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      forest.showAll();
      gsap.set([paper, decorations], { autoAlpha: 1 });
      gsap.set(logo, { clearProps: "clipPath" });
      return;
    }

    gsap
      .timeline({ defaults: { duration: 0.8, ease: "power1.out" } })
      .add(forest.play())
      .to(paper, { autoAlpha: 1 }, ">+.2")
      .to(decorations, { autoAlpha: 1, stagger: 0.05 }, ">-0.2")
      // An invisible horizontal line runs from the logo's centre to the top and bottom,
      // revealing it as it goes. fromTo keeps both clip-paths as four-value
      // insets: browsers read a set inset() back in shorthand ("0% 50%"), and
      // GSAP then mismatches the values, so only one edge would animate.
      .fromTo(
        logo,
        { clipPath: logoHidden },
        { clipPath: logoShown, duration: 1.2, ease: "power4.inOut" },
        "<",
      )
      .set(logo, { clearProps: "clipPath" });
  });

  Promise.all([
    document.fonts.ready,
    forest.ready,
    ...Array.from(scope.querySelectorAll("img"), imageReady),
  ]).then(() => {
    if (!cancelled) reveal();
  });

  return () => {
    cancelled = true;
    forest.dispose();
  };
}
