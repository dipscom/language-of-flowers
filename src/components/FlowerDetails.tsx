import Button from "./Button";
import Flower from "./Flower";
import type { FlowersById, Navigation } from "../types";

interface FlowerDetailsProps {
  bouquetLength: number;
  flowers: FlowersById;
  activeFlower: string;
  nextCta: string;
  nextStep: () => void;
  navigation: Navigation;
}

export default function FlowerDetails({
  bouquetLength,
  flowers,
  activeFlower,
  nextCta,
  nextStep,
  navigation,
}: FlowerDetailsProps) {
  const disabled = bouquetLength >= 3 ? navigation.disabled : true;
  return (
    <div id="flower-details">
      <ul>
        <Flower
          key={activeFlower}
          index={activeFlower}
          details={flowers[activeFlower]}
        />
      </ul>
      <Button
        className="button"
        cta={nextCta}
        disabled={disabled}
        step={nextStep}
      />
    </div>
  );
}
