import gsap from "gsap";

// Keeps the canvas small on phones and high-density screens.
const MAX_PIXEL_RATIO = 1.5;
const MAX_WIDTH = 2400;

const FRAME_COUNT = 9;
const DURATION = 1.6;
// Boundary points of the silhouette. A multiple of 8 so the four corners of
// the sheet (at 45°, 135°, ...) are always vertices of the final frame.
const EDGE_POINTS = 32;
const GRID_COLUMNS = 8;
const GRID_ROWS = 10;
// Radius of the crumpled ball, as a fraction of the paper's shorter side.
const BALL_RADIUS = 0.14;
// How much of the sheet the facet mesh covers on the first frame.
const BALL_MESH_SCALE = 0.36;
const FOLD_COUNT = 46;

const HIGHLIGHT = "255, 255, 255";
// Shades of white: shadows and creases are off-whites, so the folds stay soft.
const SHADE = "198, 194, 186";
const CREASE = "178, 173, 164";
// Only the ball's drop shadow on the forest is dark.
const DROP_SHADOW = "70, 55, 40";

type Point = [number, number];

interface Facet {
  points: [Point, Point, Point];
  // -1 (in shadow) to 1 (catching the light)
  shade: number;
}

interface Fold {
  // Start, bend and end of a crease.
  points: [Point, Point, Point];
  // 0 (barely there) to 1 (a hard crease)
  weight: number;
  // Which side the light catches, so creases read as relief.
  side: 1 | -1;
}

interface Frame {
  // Normalized (0..1) outline of the paper that is open in this frame.
  outline: Point[];
  facets: Facet[];
  folds: Fold[];
  // 1 while the paper is a ball, falling to 0 once flat.
  crumple: number;
  clipPath: string;
  flat: boolean;
}

function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// Builds every stop-motion frame in normalized coordinates, so the clip-path
// (percentages) and the canvas (pixels) describe exactly the same shape. The
// aspect ratio only matters to keep the ball round rather than stretched.
function buildFrames(aspect: number): Frame[] {
  const random = createRandom(7);
  const ballX = BALL_RADIUS * Math.min(1, 1 / aspect);
  const ballY = BALL_RADIUS * Math.min(1, aspect);
  const columns = GRID_COLUMNS + 1;

  // Each facet leans towards the same angle in every frame, with the rest
  // re-rolled per frame, so the paper seems to shift without becoming a blur.
  const leanings = Array.from({ length: GRID_COLUMNS * GRID_ROWS * 2 }, random);
  const lumpiness = Array.from({ length: EDGE_POINTS }, random);
  // Random creases of every length, direction and depth. Most are faint and a
  // few are hard, which is what stops the sheet looking evenly crumpled.
  const spreadX = Math.min(1, 1 / aspect);
  const spreadY = Math.min(1, aspect);
  const creases = Array.from({ length: FOLD_COUNT }, () => {
    const angle = random() * Math.PI;
    const half = 0.04 + random() ** 2 * 0.4;
    const bend = (random() - 0.5) * 0.12;
    return {
      centre: [random(), random()] as Point,
      along: [Math.cos(angle) * half, Math.sin(angle) * half] as Point,
      bend: [-Math.sin(angle) * bend, Math.cos(angle) * bend] as Point,
      weight: 0.15 + random() ** 1.6 * 0.85,
      side: random() < 0.5 ? (1 as const) : (-1 as const),
    };
  });
  const facetAmounts = Array.from(
    { length: GRID_COLUMNS * GRID_ROWS * 2 },
    () => random() ** 1.5,
  );

  return Array.from({ length: FRAME_COUNT }, (_, index) => {
    const progress = index / (FRAME_COUNT - 1);
    const open = progress ** 1.3;
    const crumple = 1 - progress;

    const outline: Point[] = Array.from({ length: EDGE_POINTS }, (_, i) => {
      const angle = (i / EDGE_POINTS) * Math.PI * 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const reach = 0.5 / Math.max(Math.abs(cos), Math.abs(sin));
      const lump = 1 + (lumpiness[i] - 0.5) * 0.5 + (random() - 0.5) * 0.25;
      const x = lerp(0.5 + cos * ballX * lump, 0.5 + cos * reach, open);
      const y = lerp(0.5 + sin * ballY * lump, 0.5 + sin * reach, open);
      if (progress === 1) return [x, y];
      const wobble = (1 - progress) * 0.04;
      return [
        clamp01(x + (random() - 0.5) * wobble),
        clamp01(y + (random() - 0.5) * wobble),
      ];
    });

    // The mesh overshoots the sheet a little so the clip never shows its edge.
    const scale = lerp(BALL_MESH_SCALE, 1, open);
    const jitter = 0.4 * crumple;
    const grid: Point[] = [];
    for (let row = 0; row <= GRID_ROWS; row++) {
      for (let column = 0; column <= GRID_COLUMNS; column++) {
        const x = lerp(-0.1, 1.1, column / GRID_COLUMNS);
        const y = lerp(-0.1, 1.1, row / GRID_ROWS);
        const looseness = 0.3 + random() * 1.4;
        const dx = ((random() - 0.5) * jitter * looseness) / GRID_COLUMNS;
        const dy = ((random() - 0.5) * jitter * looseness) / GRID_ROWS;
        grid.push([0.5 + (x + dx - 0.5) * scale, 0.5 + (y + dy - 0.5) * scale]);
      }
    }

    const facets: Facet[] = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let column = 0; column < GRID_COLUMNS; column++) {
        const topLeft = grid[row * columns + column];
        const topRight = grid[row * columns + column + 1];
        const bottomLeft = grid[(row + 1) * columns + column];
        const bottomRight = grid[(row + 1) * columns + column + 1];
        const cell = (row * GRID_COLUMNS + column) * 2;
        const triangles: [Point, Point, Point][] = [
          [topLeft, topRight, bottomLeft],
          [topRight, bottomRight, bottomLeft],
        ];
        triangles.forEach((points, offset) => {
          const lean = leanings[cell + offset];
          facets.push({
            points,
            shade:
              ((lean * 0.6 + random() * 0.4) * 2 - 1) *
              facetAmounts[cell + offset],
          });
        });
      }
    }

    const place = ([x, y]: Point, scatter: number): Point => [
      0.5 + (x - 0.5) * scale + (random() - 0.5) * scatter,
      0.5 + (y - 0.5) * scale + (random() - 0.5) * scatter,
    ];
    const scatter = 0.08 * crumple;
    const folds: Fold[] = creases.map(
      ({ centre: [cx, cy], along, bend, weight, side }) => {
        const [ax, ay] = [along[0] * spreadX, along[1] * spreadY];
        return {
          points: [
            place([cx - ax, cy - ay], scatter),
            place([cx + bend[0] * spreadX, cy + bend[1] * spreadY], scatter),
            place([cx + ax, cy + ay], scatter),
          ],
          weight,
          side,
        };
      },
    );

    const clipPath = `polygon(${outline
      .map(([x, y]) => `${(x * 100).toFixed(3)}% ${(y * 100).toFixed(3)}%`)
      .join(", ")})`;

    return {
      outline,
      facets,
      folds,
      crumple,
      clipPath,
      flat: progress === 1,
    };
  });
}

// A crumpled sheet that opens up in stop-motion over `paper`. The same outline
// is drawn on `canvas` (with fold marks) and used as a clip-path on `paper`, so
// only the part that has opened shows the real paper. `play()` returns the
// timeline; when it completes the clip-path is removed and the canvas is left
// empty.
export default function createCrumpledPaper(
  canvas: HTMLCanvasElement,
  paper: HTMLElement,
) {
  const context = canvas.getContext("2d")!;
  const state = { frame: 0 };
  let frames: Frame[] = [];
  let pixelRatio = 1;
  let shownFrame = -1;
  let animationFrame = 0;
  let disposed = false;
  // Same colour as the real paper (see .paper in Paper.module.css).
  let paperColor = "#fdfbf7";

  const trace = (outline: Point[]) => {
    context.beginPath();
    outline.forEach(([x, y], index) => {
      const px = x * canvas.width;
      const py = y * canvas.height;
      if (index === 0) context.moveTo(px, py);
      else context.lineTo(px, py);
    });
    context.closePath();
  };

  const draw = () => {
    const frame = frames[Math.round(state.frame)];
    context.clearRect(0, 0, canvas.width, canvas.height);
    // The flat sheet is the real paper with nothing left on it.
    if (!frame || frame.flat) return;

    // The paper's drop shadow lifts the ball off the forest.
    context.save();
    context.shadowColor = `rgba(${DROP_SHADOW}, ${0.5 * frame.crumple})`;
    context.shadowBlur = 24 * pixelRatio * frame.crumple;
    context.shadowOffsetY = 6 * pixelRatio * frame.crumple;
    context.fillStyle = paperColor;
    trace(frame.outline);
    context.fill();
    context.restore();

    context.save();
    trace(frame.outline);
    context.clip();
    context.lineJoin = "round";
    context.lineCap = "round";
    for (const { points, shade } of frame.facets) {
      context.beginPath();
      points.forEach(([x, y], index) => {
        const px = x * canvas.width;
        const py = y * canvas.height;
        if (index === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      });
      context.closePath();
      const strength = Math.abs(shade) * frame.crumple ** 1.5;
      context.fillStyle =
        shade > 0
          ? `rgba(${HIGHLIGHT}, ${strength * 0.8})`
          : `rgba(${SHADE}, ${strength * 0.7})`;
      context.fill();
    }

    for (const { points, weight, side } of frame.folds) {
      const trail = () => {
        context.beginPath();
        points.forEach(([x, y], index) => {
          const px = x * canvas.width;
          const py = y * canvas.height;
          if (index === 0) context.moveTo(px, py);
          else context.lineTo(px, py);
        });
      };
      const width = (0.6 + weight * 1.2) * pixelRatio;
      const offset = width * side;
      context.save();
      context.translate(offset, offset);
      context.lineWidth = width;
      context.strokeStyle = `rgba(${HIGHLIGHT}, ${weight * 0.7})`;
      trail();
      context.stroke();
      context.restore();
      context.lineWidth = width;
      context.strokeStyle = `rgba(${CREASE}, ${weight * 0.45 * frame.crumple})`;
      trail();
      context.stroke();
    }
    context.restore();

    context.save();
    trace(frame.outline);
    context.lineWidth = Math.max(1, pixelRatio);
    context.strokeStyle = `rgba(${CREASE}, ${0.3 * frame.crumple})`;
    context.stroke();
    context.restore();
  };

  // Redraws only when the stop-motion frame changes.
  const show = (force = false) => {
    const index = Math.round(state.frame);
    if (!force && index === shownFrame) return;
    shownFrame = index;
    if (frames[index]) {
      paper.style.clipPath = frames[index].flat ? "" : frames[index].clipPath;
    }
    draw();
  };

  const layout = () => {
    if (disposed) return;
    paperColor =
      getComputedStyle(canvas).getPropertyValue("--color-main-1").trim() ||
      paperColor;
    pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const scale = Math.min(1, MAX_WIDTH / (canvas.clientWidth * pixelRatio));
    const width = Math.max(
      1,
      Math.round(canvas.clientWidth * pixelRatio * scale),
    );
    const height = Math.max(
      1,
      Math.round(canvas.clientHeight * pixelRatio * scale),
    );
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    frames = buildFrames(width / height);
    show(true);
  };

  const scheduleLayout = () => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(layout);
  };

  const resizeObserver = new ResizeObserver(scheduleLayout);
  resizeObserver.observe(canvas);
  layout();

  // Ends on the flat sheet: the real paper is unclipped and the canvas is
  // left empty.
  const showAll = () => {
    state.frame = FRAME_COUNT - 1;
    show();
  };

  return {
    play() {
      const tl = gsap.timeline({ onComplete: showAll });

      tl.set([paper, canvas], { autoAlpha: 1 }).to(state, {
        frame: FRAME_COUNT - 1,
        duration: DURATION,
        ease: `steps(${FRAME_COUNT - 1})`,
        onUpdate: show,
      });

      return tl;
    },

    // Reduced motion: skip straight to the flat sheet.
    showAll() {
      gsap.set([paper, canvas], { autoAlpha: 1 });
      showAll();
    },

    dispose() {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    },
  };
}
