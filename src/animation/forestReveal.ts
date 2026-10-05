import gsap from "gsap";
import splitIntoBands from "./tonalBands";

// Must match the forest rules in Background.module.css and --landscape in
// styles/index.css.
const LANDSCAPE_QUERY = "(min-width: 1024px)";
const FOREST_IMAGES = {
  portrait: "/images/background/portrait.jpg",
  landscape: "/images/background/landscape.jpg",
};

const BAND_COUNT = 6;
// Makes the plate bloom outward from the clearing (see splitIntoBands).
const CENTRE_BIAS = 0.3;
// Keeps the band layers small on phones and high-density screens.
const MAX_PIXEL_RATIO = 1.5;
const MAX_WIDTH = 2400;

// Stable objects so the GSAP tweens keep their targets when the layers are
// rebuilt on resize.
interface Band {
  canvas: HTMLCanvasElement | null;
  alpha: number;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    // A failed image must never block the page.
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

// Draws the image like `background-size: cover; background-position: center`:
// scaled to cover the canvas, with its centre on the canvas centre so an
// oversized image is cropped equally on opposite sides.
function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const scale = Math.max(
    width / image.naturalWidth,
    height / image.naturalHeight,
  );
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    image,
    (width - drawWidth) / 2,
    (height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
}

// Cuts the forest into tonal bands that spread outward from the centre.
function createBands(image: HTMLImageElement, width: number, height: number) {
  const source = createCanvas(width, height);
  const sourceContext = source.getContext("2d", { willReadFrequently: true })!;
  drawCover(sourceContext, image, width, height);
  const pixels = sourceContext.getImageData(0, 0, width, height).data;
  return splitIntoBands(pixels, width, height, {
    count: BAND_COUNT,
    bias: CENTRE_BIAS,
    origin: { x: 0.5, y: 0.5 },
  });
}

// Prints the forest engraving onto a canvas in tonal passes. `ready` resolves
// once the image has loaded; `play()` returns the reveal timeline.
export default function createForestReveal(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d")!;
  const landscape = window.matchMedia(LANDSCAPE_QUERY);
  const pickImage = () =>
    loadImage(
      landscape.matches ? FOREST_IMAGES.landscape : FOREST_IMAGES.portrait,
    );

  let image: HTMLImageElement | null = null;
  const bands: Band[] = Array.from({ length: BAND_COUNT }, () => ({
    canvas: null,
    alpha: 0,
  }));
  let revealed = false;
  let frame = 0;
  let disposed = false;

  const releaseBands = () => {
    for (const band of bands) band.canvas = null;
  };

  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!image) return;
    if (revealed) {
      drawCover(context, image, canvas.width, canvas.height);
      return;
    }
    for (const band of bands) {
      if (!band.canvas) continue;
      context.globalAlpha = band.alpha;
      context.drawImage(band.canvas, 0, 0);
    }
    context.globalAlpha = 1;
  };

  const layout = () => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const scale = Math.min(1, MAX_WIDTH / (canvas.clientWidth * pixelRatio));
    const width = Math.max(
      1,
      Math.round(canvas.clientWidth * pixelRatio * scale),
    );
    const height = Math.max(
      1,
      Math.round(canvas.clientHeight * pixelRatio * scale),
    );
    if (!image || (canvas.width === width && canvas.height === height)) return;

    canvas.width = width;
    canvas.height = height;
    if (!revealed) {
      createBands(image, width, height).forEach((layer, index) => {
        bands[index].canvas = layer;
      });
    }
    draw();
  };

  const scheduleLayout = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(layout);
  };

  const resizeObserver = new ResizeObserver(scheduleLayout);

  const onBreakpointChange = async () => {
    const next = await pickImage();
    if (disposed || !next) return;
    image = next;
    canvas.width = 0; // forces layout() to rebuild for the new image
    layout();
  };

  const ready = pickImage().then((loaded) => {
    if (disposed) return;
    image = loaded;
    layout();
    resizeObserver.observe(canvas);
    landscape.addEventListener("change", onBreakpointChange);
  });

  const showAll = () => {
    revealed = true;
    releaseBands();
    draw();
  };

  return {
    ready,

    play() {
      return gsap
        .timeline({
          defaults: { duration: 0.6, ease: "power4.in" },
          onUpdate: draw,
          onComplete: showAll,
        })
        .to(bands, { alpha: 1, stagger: 0.2 });
    },

    // Reduced motion: skip the passes and show the finished plate.
    showAll,

    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      landscape.removeEventListener("change", onBreakpointChange);
    },
  };
}
