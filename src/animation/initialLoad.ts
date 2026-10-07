import gsap from "gsap";
import createForestReveal from "./forestReveal";
import createCrumpledPaper from "./crumpledPaper";
import createPageFlip from "./pageFlip";
import createOverlayReveal from "./overlayReveal";
import { preloadFlowerImages } from "./flowerImages";

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
  // Flowers whose PNGs the bouquet builder needs; preloaded behind the loader.
  flowerKeys: string[];
  onReady: () => void;
  contextSafe: <T extends (...args: never[]) => unknown>(fn: T) => T;
}

// Hides the paper and content, waits for every asset, then reveals them back
// to front: the forest is printed onto its canvas, the paper unfolds from a
// crumpled ball, then a page is turned over it, revealing the content.
// Returns a cleanup that stops a pending wait (StrictMode runs effects twice).
export default function initialLoad({
  scope,
  flowerKeys,
  onReady,
  contextSafe,
}: InitialLoadOptions) {
  const forest = createForestReveal(
    scope.querySelector<HTMLCanvasElement>('canvas[data-load="forest"]')!,
  );
  const paperElement = scope.querySelector<HTMLElement>('[data-load="paper"]')!;
  const crumpleCanvas = scope.querySelector<HTMLCanvasElement>(
    'canvas[data-load="crumple"]',
  )!;
  const crumple = createCrumpledPaper(crumpleCanvas, paperElement);
  const flip = createPageFlip(
    scope.querySelector<HTMLCanvasElement>('canvas[data-load="flip"]')!,
  );
  const content = '[data-load="content"]';
  const overlay = '[data-load="overlay"]';
  let cancelled = false;

  // Only visibility is touched on the paper and the ball: their opacity comes
  // from --paper-opacity and must not be overwritten by an inline value.
  gsap.set([paperElement, crumpleCanvas], { visibility: "hidden" });
  gsap.set([content, overlay], { autoAlpha: 0 });

  const reveal = contextSafe(() => {
    onReady();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      forest.showAll();
      crumple.showAll();
      gsap.set([content, overlay], { autoAlpha: 1 });
      return;
    }

    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power1.out" },
    });

    tl.add(forest.play())
      .add(crumple.play())
      .add(createOverlayReveal(scope), "<=+0.5")
      // The content stays hidden until a leaf is turned over the paper, from
      // the right to the left, revealing it as the fold passes.
      .call(
        () => {
          const page = scope.querySelector<HTMLElement>(content)!;
          gsap.set(page, { autoAlpha: 1 });
          flip.play(page, "forward");
        },
        undefined,
        "-=1",
      );
  });

  Promise.all([
    document.fonts.ready,
    forest.ready,
    preloadFlowerImages(flowerKeys),
    ...Array.from(scope.querySelectorAll("img"), imageReady),
  ]).then(() => {
    if (!cancelled) reveal();
  });

  return () => {
    cancelled = true;
    forest.dispose();
    crumple.dispose();
    flip.dispose();
  };
}
