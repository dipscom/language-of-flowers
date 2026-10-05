const images = new Map<string, HTMLImageElement>();

// The shared, cached image for a flower, requested on first use.
export function loadFlowerImage(key: string) {
  let image = images.get(key);
  if (!image) {
    image = new Image();
    image.src = "/images/flowers/" + key + ".png";
    images.set(key, image);
  }
  return image;
}

// Resolves once every flower is loaded and decoded, so the first canvas draw
// doesn't hitch. A failed image must never block the page.
export function preloadFlowerImages(keys: string[]) {
  return Promise.all(
    keys.map((key) =>
      loadFlowerImage(key)
        .decode()
        .catch(() => undefined),
    ),
  ).then(() => undefined);
}
