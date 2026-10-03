import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./BouquetVisualiser.module.css";

// Degrees by position in the bouquet; negative is anti-clockwise.
const ROTATIONS = [-15, 15, 0];
const FADE_SECONDS = 0.25;
const ROTATE_SECONDS = 0.3;

interface BouquetVisualiserProps {
  bouquet: string[];
  hovered?: string | null;
}

interface Layer {
  key: string;
  rotation: number;
  alpha: number;
}

const images = new Map<string, HTMLImageElement>();

function loadImage(key: string, onLoad: () => void) {
  let image = images.get(key);
  if (!image) {
    image = new Image();
    image.src = "/images/flowers/" + key + ".png";
    images.set(key, image);
  }
  if (!image.complete) image.addEventListener("load", onLoad, { once: true });
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
    for (const { key, rotation, alpha } of layers.current) {
      const image = images.get(key);
      if (!image?.complete || !image.naturalWidth) continue;
      const width = (size * image.naturalWidth) / image.naturalHeight;
      // Pivot on the bottom centre of the canvas, which is also the bottom
      // centre of the image.
      context.save();
      context.globalAlpha = alpha;
      context.translate(canvas.width / 2, size);
      context.rotate((rotation * Math.PI) / 180);
      context.drawImage(image, -width / 2, -size, width, size);
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
    () => {
      // Off-screen or reduced-motion changes are applied in a single draw.
      const animate =
        visible.current &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets: [string, number][] = bouquet.map((key, i) => [
        key,
        ROTATIONS[i] ?? 0,
      ]);
      if (hovered && !bouquet.includes(hovered)) targets.push([hovered, 0]);

      const previous = new Map(
        layers.current.map((layer) => [layer.key, layer]),
      );
      layers.current = targets.map(([key, rotation]) => {
        const layer = previous.get(key);
        loadImage(key, draw);
        if (!layer) {
          const fadeIn = mounted.current && animate;
          const added = { key, rotation, alpha: fadeIn ? 0 : 1 };
          if (fadeIn) {
            gsap.to(added, {
              alpha: 1,
              duration: FADE_SECONDS,
              onUpdate: draw,
            });
          }
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
      mounted.current = true;
      draw();
    },
    { dependencies: [bouquet, hovered] },
  );

  return (
    <div className={styles.bouquetVisualiser}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
