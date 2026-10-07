interface SplitOptions {
  count: number;
  // How much the distance from the origin delays a pixel, as a share of the
  // tonal range.
  bias: number;
  // Where the reveal spreads from, as fractions of the image (0.5/0.5 is the
  // centre, 0.5/1 the bottom centre).
  origin: { x: number; y: number };
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

// Splits an image's pixels into tonal bands: darkest (and nearest the origin)
// first. Every opaque pixel lands in exactly one band, so all bands at full
// alpha reproduce the original image.
export default function splitIntoBands(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  { count, bias, origin }: SplitOptions,
) {
  const outputs = Array.from(
    { length: count },
    () => new ImageData(width, height),
  );
  const bandSize = (255 * (1 + bias)) / count;
  const originX = origin.x * width;
  const originY = origin.y * height;
  // Distance is normalised per axis by the farthest edge.
  const reachX = Math.max(originX, width - originX);
  const reachY = Math.max(originY, height - originY);
  const columnDistance = Float32Array.from(
    { length: width },
    (_, x) => ((x - originX) / reachX) ** 2,
  );

  for (let y = 0; y < height; y++) {
    const rowDistance = ((y - originY) / reachY) ** 2;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (pixels[i + 3] === 0) continue;
      const luminance =
        0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
      const distance = Math.sqrt((columnDistance[x] + rowDistance) / 2);
      const band = Math.min(
        count - 1,
        Math.floor((luminance + bias * 255 * distance) / bandSize),
      );
      const output = outputs[band].data;
      output[i] = pixels[i];
      output[i + 1] = pixels[i + 1];
      output[i + 2] = pixels[i + 2];
      output[i + 3] = pixels[i + 3];
    }
  }

  return outputs.map((data) => {
    const canvas = createCanvas(width, height);
    canvas.getContext("2d")!.putImageData(data, 0, 0);
    return canvas;
  });
}
