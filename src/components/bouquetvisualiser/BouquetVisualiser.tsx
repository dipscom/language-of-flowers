import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { loadFlowerImage } from "../../animation/flowerImages";
import splitIntoBands from "../../animation/tonalBands";
import styles from "./BouquetVisualiser.module.css";

// Degrees by position in the bouquet; negative is anti-clockwise.
const ROTATIONS = [-15, 15, 0];
const ROTATE_SECONDS = 0.3;
// A new flower is printed in tonal passes (see animation/tonalBands.ts),
// starting from the stem and quick enough for hover previews.
const BAND_COUNT = 4;
const BAND_BIAS = 0.3;
const BAND_SECONDS = 0.2;
const BAND_STAGGER = 0.06;

interface BouquetVisualiserProps {
  // Flowers by position; "" leaves that position empty.
  bouquet: string[];
  hovered?: string | null;
}

interface Band {
  canvas: HTMLCanvasElement;
  alpha: number;
}

interface Layer {
  key: string;
  rotation: number;
  alpha: number;
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
}: BouquetVisualiserProps) {
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
    for (const { key, rotation, alpha, bands } of layers.current) {
      const image = loadFlowerImage(key);
      if (!image.complete || !image.naturalWidth) continue;
      const width = (size * image.naturalWidth) / image.naturalHeight;
      // Pivot on the bottom centre of the canvas, which is also the bottom
      // centre of the image.
      context.save();
      context.translate(canvas.width / 2, size);
      context.rotate((rotation * Math.PI) / 180);
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

  // Selected flowers in selection order, then a hovered preview on top. The
  // preview is unrotated until it is selected. Frames are only requested by
  // the GSAP tweens below, so nothing runs once they finish.
  useGSAP(
    (_context, contextSafe) => {
      // Off-screen or reduced-motion changes are applied in a single draw.
      const animate =
        visible.current &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets: [string, number][] = bouquet.flatMap((key, i) =>
        key ? [[key, ROTATIONS[i] ?? 0] as [string, number]] : [],
      );
      if (hovered && !bouquet.includes(hovered)) targets.push([hovered, 0]);

      const previous = new Map(
        layers.current.map((layer) => [layer.key, layer]),
      );
      // Stop revealing flowers that were removed (a hover ending, say).
      for (const layer of previous.values()) {
        if (layer.bands && !targets.some(([key]) => key === layer.key)) {
          gsap.killTweensOf(layer.bands);
        }
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
          const added: Layer = { key, rotation, alpha: fadeIn ? 0 : 1 };
          if (fadeIn) revealing.push(added);
          return added;
        }
        if (layer.rotation !== rotation) {
          if (animate) {
            gsap.to(layer, {
              rotation,
              duration: ROTATE_SECONDS,
              overwrite: "auto",
              onUpdate: draw,
            });
          } else {
            gsap.killTweensOf(layer);
            layer.rotation = rotation;
          }
        }
        return layer;
      });
      revealing.forEach(reveal);
      mounted.current = true;
      draw();
    },
    { dependencies: [bouquet, hovered] },
  );

  return (
    <div className={styles["bouquet-visualiser"]}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
