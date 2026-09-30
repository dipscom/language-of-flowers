import { useEffect } from "react";
import Flower from "./Flower";
import useScrollContainer from "./scrollcontainer/useScrollContainer";
import type { FlowersById } from "../types";
import ParagraphDecoration from "./ParagraphDecoration";

interface FlowerSelectProps {
  bouquet: string[];
  flowers: FlowersById;
  selectFlower: (key: string) => void;
  updateActiveFlower: (key: string) => void;
  enableButton: () => void;
}

export default function FlowerSelect({
  bouquet,
  flowers,
  selectFlower,
  updateActiveFlower,
  enableButton,
}: FlowerSelectProps) {
  const { resetScroll } = useScrollContainer();

  useEffect(() => {
    resetScroll();
    if (enableButton) {
      enableButton();
    }
  }, []);

  return (
    <div id="flower-select">
      <header>
        <h1>Create your bouquet</h1>
        <ParagraphDecoration />
      </header>
      <strong className="sub-heading">Select 3 flowers:</strong>
      <ul id="flower-list">
        {Object.keys(flowers).map((key) => (
          <Flower
            key={key}
            index={key}
            bouquetLength={bouquet.length}
            details={flowers[key]}
            selectFlower={selectFlower}
            updateActiveFlower={updateActiveFlower}
          />
        ))}
      </ul>
      <ol className="bouquet-list">
        {bouquet.map((key) => (
          <Flower key={key} index={key} details={flowers[key]} />
        ))}
      </ol>
    </div>
  );
}
