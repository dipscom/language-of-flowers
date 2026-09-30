import Flower from "./Flower";
import type { FlowersById } from "../types";
import ParagraphDecoration from "./ParagraphDecoration";

interface BouquetDetailsProps {
  bouquet: string[];
  flowers: FlowersById;
}

export default function BouquetDetails({
  bouquet,
  flowers,
}: BouquetDetailsProps) {
  return (
    <div id="bouquet-details">
      <div>
        <header>
          <h1>Your Bouquet</h1>
          <ParagraphDecoration />
        </header>
        <ol className="bouquet-list">
          <li>
            <p className="message">
              Your beloved has sent you a beautiful floral bouquet. The meanings
              of their chosen flowers are listed below.
            </p>
          </li>
          {bouquet.map((key) => (
            <Flower key={key} index={key} details={flowers[key]} />
          ))}
        </ol>
      </div>
    </div>
  );
}
