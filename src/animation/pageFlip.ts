import gsap from "gsap";

const MAX_PIXEL_RATIO = 1.5;
const DURATION = 1.3;
// How far the fold leans (radians) as the leaf lifts away; it settles upright.
const MAX_TILT = 0.14;
// Width of the shadow the fold casts on the flap, as a fraction of the page.
const FOLD_SHADE = 0.22;

// "forward" lifts the page and reveals the next one underneath it, the fold
// running from the right to the left. "back" goes back in a book: the new page
// is laid on top of the current one, the fold running from the left to the
// right.
export type FlipKind = "forward" | "back";

export interface PageFlip {
  // Sweeps a leaf across the page: `incoming` is revealed behind the fold,
  // through a clip-path that follows it, while `outgoing` (if any) is cut away
  // by the same fold, so none of it shows through the incoming page. The flap
  // of paper covers the rest. Resolves when it is done (or when cancelled).
  play(
    incoming: HTMLElement,
    kind: FlipKind,
    outgoing?: HTMLElement | null,
  ): Promise<void>;
  // Jumps to the end of a running flip.
  finish(): void;
  dispose(): void;
}

// Turns a page over: the fold runs across the page with the incoming page
// behind it. The flap is blank paper, drawn on the canvas as the mirror image
// of one side of the fold; the pages are cut to the fold with clip-paths, so
// the real DOM shows through. Going forward the flap is the swept part,
// peeled and laid over the old page; going back it is the part still to be
// laid, curled over the new page and shrinking as it lands. Everything is
// driven by one continuous tween (no stepping).
export default function createPageFlip(canvas: HTMLCanvasElement): PageFlip {
  const context = canvas.getContext("2d")!;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let paperColor = "#fdfbf7";
  let tween: gsap.core.Tween | undefined;
  let settle: (() => void) | undefined;
  const state = { progress: 0 };
  let kind: FlipKind = "forward";
  let incomingPage: HTMLElement | undefined;

  function layout() {
    paperColor =
      getComputedStyle(canvas).getPropertyValue("--color-main-1").trim() ||
      paperColor;
    pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
  }

  // The fold is a line through (x, height / 2) leaning by `tilt`; `normal`
  // points to the right of it.
  function fold(progress: number) {
    const tilt = MAX_TILT * (1 - progress);
    // Starts and ends fully off the page, whatever the tilt.
    const margin = (height / 2) * Math.tan(MAX_TILT) + 2;
    const x = -margin + (width + 2 * margin) * progress;
    return { x, tan: Math.tan(tilt), nx: Math.cos(tilt), ny: -Math.sin(tilt) };
  }

  // The page's corners on one side of the fold, mirrored across it: the
  // outline of the flap. That is the swept side (left) going forward, and the
  // side still to be swept (right) going back.
  function flapOutline(x: number, nx: number, ny: number) {
    const sign = kind === "forward" ? 1 : -1;
    const px = x;
    const py = height / 2;
    const corners = [
      [0, 0],
      [width, 0],
      [width, height],
      [0, height],
    ];
    const side = (q: number[]) => sign * ((q[0] - px) * nx + (q[1] - py) * ny);
    const kept: number[][] = [];
    corners.forEach((q, index) => {
      const next = corners[(index + 1) % corners.length];
      const sq = side(q);
      const sn = side(next);
      if (sq <= 0) kept.push(q);
      if (sq <= 0 !== sn <= 0) {
        const t = sq / (sq - sn);
        kept.push([q[0] + (next[0] - q[0]) * t, q[1] + (next[1] - q[1]) * t]);
      }
    });
    const path = new Path2D();
    kept.forEach(([qx, qy], index) => {
      const distance = (qx - px) * nx + (qy - py) * ny;
      const point: [number, number] = [qx - 2 * distance * nx, qy - 2 * distance * ny];
      if (index === 0) path.moveTo(...point);
      else path.lineTo(...point);
    });
    path.closePath();
    return path;
  }

  function draw(incoming: HTMLElement, outgoing?: HTMLElement | null) {
    const { progress } = state;
    const { x, tan, nx, ny } = fold(progress);
    const edge = (y: number) => x + (y - height / 2) * tan;

    // The geometry is worked out for a fold sweeping left to right, which is
    // how a page goes back; going forward is that, mirrored.
    const mirror = (px: number) => (kind === "back" ? px : width - px);
    const home = mirror(0);
    const away = mirror(width);
    const top = `${mirror(edge(0))}px 0`;
    const bottom = `${mirror(edge(height))}px ${height}px`;
    // Each side of the fold belongs to one page: the incoming one where the
    // fold has been, the outgoing one where it has yet to go.
    incoming.style.clipPath = `polygon(${home}px 0, ${top}, ${bottom}, ${home}px ${height}px)`;
    if (outgoing) {
      outgoing.style.clipPath = `polygon(${away}px 0, ${top}, ${bottom}, ${away}px ${height}px)`;
    }

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (progress <= 0 || progress >= 1) return;

    const dpr = pixelRatio;
    const flap = flapOutline(x, nx, ny);

    context.save();
    if (kind === "back") context.setTransform(dpr, 0, 0, dpr, 0, 0);
    else context.setTransform(-dpr, 0, 0, dpr, width * dpr, 0);
    // Only the page itself.
    context.beginPath();
    context.rect(0, 0, width, height);
    context.clip();

    // The flap casts its shadow onto the page beneath it, which is on its own
    // side of the fold: the half-plane clip keeps it from falling onto the
    // other page.
    context.save();
    const keep = new Path2D();
    const across = (kind === "forward" ? 1 : -1) * 3 * width;
    keep.moveTo(edge(-height), -height);
    keep.lineTo(edge(2 * height), 2 * height);
    keep.lineTo(edge(2 * height) + across, 2 * height);
    keep.lineTo(edge(-height) + across, -height);
    keep.closePath();
    context.clip(keep);
    context.shadowColor = "rgba(0, 0, 0, 0.35)";
    context.shadowBlur = 22 * dpr;
    // Shadow offsets ignore the transform. On screen the flap is always left
    // of the fold, so the shadow is thrown to the left.
    context.shadowOffsetX = -7 * dpr;
    context.shadowOffsetY = 3 * dpr;
    context.fillStyle = paperColor;
    context.fill(flap);
    context.restore();

    // Curl shading across the flap: darkest at the crease, a soft highlight
    // after it.
    context.save();
    context.clip(flap);
    const reach = (kind === "forward" ? 1 : -1) * width * FOLD_SHADE;
    const shade = context.createLinearGradient(
      x,
      height / 2,
      x + nx * reach,
      height / 2 + ny * reach,
    );
    shade.addColorStop(0, "rgba(60, 50, 40, 0.28)");
    shade.addColorStop(0.18, "rgba(60, 50, 40, 0.1)");
    shade.addColorStop(0.55, "rgba(255, 255, 255, 0.16)");
    shade.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.fillStyle = shade;
    context.fillRect(0, 0, width, height);
    context.restore();

    context.restore();
  }

  layout();
  const resizeObserver = new ResizeObserver(() => layout());
  resizeObserver.observe(canvas);

  function end() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    // The outgoing page stays cut away: it is about to be unmounted, and
    // clearing its clip would flash it for a frame.
    if (incomingPage) incomingPage.style.clipPath = "";
    incomingPage = undefined;
    tween = undefined;
    settle?.();
    settle = undefined;
  }

  return {
    play(incoming, flipKind, outgoing) {
      tween?.progress(1);
      kind = flipKind;
      return new Promise<void>((resolve) => {
        settle = resolve;
        state.progress = 0;
        incomingPage = incoming;
        draw(incoming, outgoing);
        tween = gsap.to(state, {
          progress: 1,
          duration: DURATION,
          ease: "power2.inOut",
          onUpdate: () => draw(incoming, outgoing),
          onComplete: end,
        });
      });
    },
    finish() {
      tween?.progress(1);
    },
    dispose() {
      tween?.kill();
      resizeObserver.disconnect();
      end();
    },
  };
}
