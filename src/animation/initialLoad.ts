import gsap from "gsap";
import createForestReveal from "./forestReveal";
import createCrumpledPaper from "./crumpledPaper";
import { preloadFlowerImages } from "./flowerImages";
import { markContentRevealed } from "./contentReveal";
import createElementReveal from "./elementReveal";
import createHeadingReveal from "./headingReveal";
import createLogoReveal from "./logoReveal";
import createParagraphDecorationReveal, {
  paragraphDecorationDelay,
} from "./paragraphDecoration";

// Resolves once an <img> has loaded; a failed image must never block the page.
function imageReady(image: HTMLImageElement) {
  if (image.complete) return Promise.resolve();
  return new Promise<void>((resolve) => {
    image.addEventListener("load", () => resolve(), { once: true });
    image.addEventListener("error", () => resolve(), { once: true });
  });
}

// Seconds the header (heading and paragraph decorations) starts before the
// logo has finished, and the heading's words after the header starts.
const HEADER_OVERLAP = 0.9;
const HEADING_DELAY = 0.4;
// Seconds the page's other elements start before the heading has finished.
const ELEMENTS_OVERLAP = 0.6;

interface InitialLoadOptions {
  scope: Element;
  // Flowers whose PNGs the bouquet builder needs; preloaded behind the loader.
  flowerKeys: string[];
  onReady: () => void;
  contextSafe: <T extends (...args: never[]) => unknown>(fn: T) => T;
}

// Hides the page, waits for every asset, then reveals it back to front: the
// forest is printed onto its canvas, then the paper unfolds from a crumpled
// ball, the content appears, the logo is drawn in, then the heading fades in
// word by word between its paragraph decorations, and the flowers fade in.
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
  const logo = createLogoReveal(scope);
  const content = '[data-load="content"]';
  const overlay = '[data-load="overlay"] > img';
  let cancelled = false;

  gsap.set([paperElement, crumpleCanvas, content, overlay], {
    autoAlpha: 0,
  });

  const reveal = contextSafe(() => {
    onReady();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      forest.showAll();
      crumple.showAll();
      gsap.set([content, overlay], { autoAlpha: 1 });
      markContentRevealed();
      return;
    }

    // The paragraph decorations hide themselves when they mount.
    const headings = Array.from(
      scope.querySelectorAll(`${content} h1`),
      createHeadingReveal,
    );
    const paragraphDecorations = Array.from(
      scope.querySelectorAll(`${content} [data-load="decoration"]`),
      (element) => ({
        delay: paragraphDecorationDelay(element),
        reveal: createParagraphDecorationReveal(element),
      }),
    );
    const elements = createElementReveal(
      Array.from(scope.querySelectorAll(`${content} [data-load="rise"]`)),
    );
    logo.hide();
    elements.hide();
    headings.forEach((heading) => heading.hide());

    const logoTimeline = logo.play();
    const timeline = gsap
      .timeline({ defaults: { duration: 0.8, ease: "power1.out" } })
      .add(forest.play())
      .add(crumple.play())
      .set(content, { autoAlpha: 1 })
      .call(markContentRevealed)
      .addLabel("logo")
      .add(logoTimeline, "logo")
      .to(overlay, { autoAlpha: 1, stagger: 0.05 }, "logo-=0.2")
      // The header starts while the logo's lines are still being drawn.
      .addLabel(
        "header",
        `logo+=${Math.max(0, logoTimeline.duration() - HEADER_OVERLAP)}`,
      );
    for (const { delay, reveal } of paragraphDecorations) {
      timeline.add(reveal.play(), `header+=${delay}`);
    }
    let elementsStart = HEADING_DELAY;
    for (const heading of headings) {
      const headingTimeline = heading.play();
      timeline.add(headingTimeline, `header+=${HEADING_DELAY}`);
      elementsStart = Math.max(
        elementsStart,
        HEADING_DELAY + headingTimeline.duration() - ELEMENTS_OVERLAP,
      );
    }
    timeline.add(elements.play(), `header+=${elementsStart}`);
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
