import { useState } from "react";
import BouquetBuilder from "../bouquetbuilder/BouquetBuilder";
import BouquetVisualiser from "../bouquetvisualiser/BouquetVisualiser";
import PageHeader from "../PageHeader";
import TwoColumn, { Column } from "../twocolumn/TwoColumn";
import { useAppState } from "../../state/useAppState";

export default function BuildBouquet() {
  const { bouquet, slots, freeSlots, flowers, selectFlowers } = useAppState();

  const [hoveredFlower, setHoveredFlower] = useState<string | null>(null);

  return (
    <TwoColumn>
      <Column>
        <PageHeader title="Create your bouquet" />
        <BouquetBuilder
          bouquet={bouquet}
          flowers={flowers}
          selectFlowers={selectFlowers}
          onHover={setHoveredFlower}
        />
      </Column>
      <Column>
        <BouquetVisualiser
          bouquet={slots}
          hovered={hoveredFlower}
          hoveredSlot={freeSlots[0]}
        />
      </Column>
    </TwoColumn>
  );
}
