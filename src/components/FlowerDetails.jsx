import Button from "./Button";
import Flower from "./Flower";

export default function FlowerDetails({
  bouquetLength,
  flowers,
  activeFlower,
  nextCta,
  nextStep,
  navigation,
}) {
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
