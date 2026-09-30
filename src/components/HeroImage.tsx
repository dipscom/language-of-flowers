import ParagraphDecoration from "./ParagraphDecoration";

interface HeroImageProps {
  bouquet: string[];
}

export default function HeroImage({ bouquet }: HeroImageProps) {
  return (
    <div id="hero-image">
      <div className="heading">
        <p>Your Bouquet</p>
        <ParagraphDecoration />
      </div>
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
