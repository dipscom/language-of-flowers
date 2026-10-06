import gsap from "gsap";
import createForestReveal from "./forestReveal";
import createCrumpledPaper from "./crumpledPaper";
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

// Hides the page, waits for every asset, then reveals it back to front: the
// forest is printed onto its canvas, then the paper unfolds from a crumpled
// ball, the content appears and the decorations fade in.
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
  const content = '[data-load="content"]';
  const decorations = '[data-load="overlay"] > img';
  let cancelled = false;

  gsap.set([paperElement, crumpleCanvas, content, decorations], {
    autoAlpha: 0,
  });

  const reveal = contextSafe(() => {
    onReady();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      forest.showAll();
      crumple.showAll();
      gsap.set([content, decorations], { autoAlpha: 1 });
      return;
    }

    gsap
      .timeline({ defaults: { duration: 0.8, ease: "power1.out" } })
      .add(forest.play())
      .add(crumple.play(), ">+.2")
      .set(content, { autoAlpha: 1 })
      .to(decorations, { autoAlpha: 1, stagger: 0.05 }, ">-0.2");
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
  };
}
