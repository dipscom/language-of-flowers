interface HeroImageProps {
  bouquet: string[];
}

export default function HeroImage({ bouquet }: HeroImageProps) {
  return (
    <div id="hero-image">
      <header>
        <h1>Your Bouquet</h1>
        <hr />
      </header>
      <figure
        style={{
          backgroundImage:
            "url(/images/bouquets/" +
            [...bouquet].sort().toString().replace(/,/g, "_") +
            ".png)",
        }}
      ></figure>
    </div>
  );
}
