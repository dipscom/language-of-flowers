import PageHeader from "./PageHeader";

interface HeroImageProps {
  bouquet: string[];
}

export default function HeroImage({ bouquet }: HeroImageProps) {
  return (
    <div id="hero-image">
      <PageHeader title="Your Bouquet" />
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
