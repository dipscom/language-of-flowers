import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { loadFlowerImage } from "../../animation/flowerImages";
import splitIntoBands from "../../animation/tonalBands";
import { joinNames } from "../../bouquetMessage";
import { useAppState } from "../../state/useAppState";
import styles from "./BouquetVisualiser.module.css";

// Degrees by position in the bouquet; negative is anti-clockwise.
const ROTATIONS = [-15, 15, 0];
// A new flower is printed in tonal passes (see animation/tonalBands.ts),
// starting from the stem and quick enough for hover previews.
const BAND_COUNT = 4;
const BAND_BIAS = 0.3;
const BAND_SECONDS = 0.2;
const BAND_STAGGER = 0.06;
// A hovered flower is held 1.5% of the canvas above its resting position, along
// its own stem direction, so rotated flowers are lifted diagonally. Selecting
// it slides it into place, easing back slightly past the mark before settling.
const HELD_LIFT = 0.015;
const PLACE_SECONDS = 0.6;
const PLACE_EASE = "back.out(1.4)";

interface BouquetVisualiserProps {
  // Flowers by position; "" leaves that position empty.
  bouquet: string[];
  hovered?: string | null;
  // The position a hovered flower would take if selected.
  hoveredSlot?: number;
}

interface Band {
  canvas: HTMLCanvasElement;
  alpha: number;
}

interface Layer {
  key: string;
  rotation: number;
  alpha: number;
  // Distance held above the resting position, as a fraction of the canvas.
  lift: number;
  // True while the flower is sliding into place.
  settling?: boolean;
  // Present only while the flower is being revealed.
  bands?: Band[];
}

// Cuts a flower into tonal bands, spreading from its bottom centre.
function createBands(image: HTMLImageElement) {
  const { naturalWidth: width, naturalHeight: height } = image;
  const source = document.createElement("canvas");
  source.width = width;
  source.height = height;
  const context = source.getContext("2d", { willReadFrequently: true })!;
  context.drawImage(image, 0, 0);
  const pixels = context.getImageData(0, 0, width, height).data;
  return splitIntoBands(pixels, width, height, {
    count: BAND_COUNT,
    bias: BAND_BIAS,
    origin: { x: 0.5, y: 1 },
  }).map<Band>((canvas) => ({ canvas, alpha: 0 }));
}

export default function BouquetVisualiser({
  bouquet,
  hovered,
  hoveredSlot,
}: BouquetVisualiserProps) {
  const { flowers } = useAppState();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layers = useRef<Layer[]>([]);
  const mounted = useRef(false);
  const visible = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const size = canvas.height;
    context.clearRect(0, 0, canvas.width, size);
    for (const { key, rotation, alpha, lift, bands } of layers.current) {
      const image = loadFlowerImage(key);
      if (!image.complete || !image.naturalWidth) continue;
      const width = (size * image.naturalWidth) / image.naturalHeight;
      // Pivot on the bottom centre of the canvas, which is also the bottom
      // centre of the image.
      context.save();
      context.translate(canvas.width / 2, size);
      context.rotate((rotation * Math.PI) / 180);
      // Along the flower's own (rotated) axis, so the lift is diagonal.
      context.translate(0, -lift * size);
      if (bands) {
        for (const band of bands) {
          context.globalAlpha = band.alpha;
          context.drawImage(band.canvas, -width / 2, -size, width, size);
        }
      } else {
        context.globalAlpha = alpha;
        context.drawImage(image, -width / 2, -size, width, size);
      }
      context.restore();
    }
  }, []);

  // Keep the drawing buffer matched to the displayed size.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      canvas.width = canvas.height = Math.round(
        canvas.clientHeight * window.devicePixelRatio,
      );
      draw();
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [draw]);

  // Animations only play while the canvas can be seen.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Flowers are stacked by position, back to front. A hovered preview takes
  // the position it would get if selected (so it can sit behind or between
  // the others), already at that position's angle. Frames are only requested
  // by the GSAP tweens below, so nothing runs once they finish.
  useGSAP(
    (_context, contextSafe) => {
      // Off-screen or reduced-motion changes are applied in a single draw.
      const animate =
        visible.current &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stack = bouquet.map((key) => key || null);
      if (
        hovered &&
        !bouquet.includes(hovered) &&
        hoveredSlot !== undefined &&
        stack[hoveredSlot] === null
      ) {
        stack[hoveredSlot] = hovered;
      }
      const targets: [string, number][] = stack.flatMap((key, i) =>
        key ? [[key, ROTATIONS[i] ?? 0] as [string, number]] : [],
      );

      const previous = new Map(
        layers.current.map((layer) => [layer.key, layer]),
      );
      // Stop animating flowers that were removed (a hover ending, say).
      for (const layer of previous.values()) {
        if (targets.some(([key]) => key === layer.key)) continue;
        gsap.killTweensOf(layer);
        if (layer.bands) gsap.killTweensOf(layer.bands);
      }

      // The image is normally preloaded, so this starts at once; otherwise it
      // waits for the image to arrive.
      const reveal = (layer: Layer) => {
        const image = loadFlowerImage(layer.key);
        const start = contextSafe!(() => {
          if (!layers.current.includes(layer)) return;
          if (!image.naturalWidth) {
            layer.alpha = 1;
            return;
          }
          const bands = createBands(image);
          layer.bands = bands;
          gsap.to(bands, {
            alpha: 1,
            duration: BAND_SECONDS,
            ease: "power1.out",
            stagger: BAND_STAGGER,
            onUpdate: draw,
            onComplete() {
              // Back to the untouched image.
              layer.bands = undefined;
              layer.alpha = 1;
              draw();
            },
          });
        });
        if (image.complete) start();
        else image.addEventListener("load", start, { once: true });
      };

      const revealing: Layer[] = [];
      layers.current = targets.map(([key, rotation]) => {
        const layer = previous.get(key);
        const image = loadFlowerImage(key);
        if (!image.complete)
          image.addEventListener("load", draw, { once: true });
        if (!layer) {
          const fadeIn = mounted.current && animate;
          const added: Layer = {
            key,
            rotation,
            alpha: fadeIn ? 0 : 1,
            // Only a hover preview is held up.
            lift: bouquet.includes(key) ? 0 : HELD_LIFT,
          };
          if (fadeIn) revealing.push(added);
          return added;
        }
        // A position never changes while a flower is selected; this only
        // keeps the angle right if it does.
        layer.rotation = rotation;
        // Selected while held up: slide it into place.
        if (bouquet.includes(key) && layer.lift !== 0 && !layer.settling) {
          if (animate) {
            layer.settling = true;
            gsap.to(layer, {
              lift: 0,
              duration: PLACE_SECONDS,
              ease: PLACE_EASE,
              onUpdate: draw,
              onComplete() {
                layer.settling = false;
              },
            });
          } else {
            layer.lift = 0;
          }
        }
        return layer;
      });
      revealing.forEach(reveal);
      mounted.current = true;
      draw();
    },
    { dependencies: [bouquet, hovered, hoveredSlot] },
  );

  const chosen = bouquet.filter((key) => key && Object.hasOwn(flowers, key));
  const label = chosen.length
    ? `Bouquet of ${joinNames(chosen, flowers)}`
    : "An empty bouquet";

  return (
    <div className={styles["bouquet-visualiser"]} role="img" aria-label={label}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
