import Flower from "./Flower";
import type { FlowersById } from "../types";
import PageHeader from "./PageHeader";

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
        <PageHeader title="Your Bouquet" />
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
