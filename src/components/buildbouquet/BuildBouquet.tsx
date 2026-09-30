import { useEffect, useState } from "react";
import BouquetBuilder from "../bouquetbuilder/BouquetBuilder";
import BouquetVisualiser from "../bouquetvisualiser/BouquetVisualiser";
import PersonDetails from "../PersonDetails";
import styles from "./BuildBouquet.module.css";
import useScrollContainer from "../scrollcontainer/useScrollContainer";
import { useAppState } from "../../state/useAppState";

export default function BuildBouquet() {
  const {
    bouquet,
    flowers,
    recipient,
    sender,
    steps,
    navigation,
    selectFlower,
    updateField,
    nextStep,
    prevStep,
    enableButton,
  } = useAppState();

  const { resetScroll } = useScrollContainer();
  const [hoveredFlower, setHoveredFlower] = useState<string | null>(null);

  useEffect(() => {
    resetScroll();
    enableButton();
  }, [steps.current]);

  return (
    <div className={styles["build-bouquet"]}>
      <div className="column">
        <BouquetVisualiser bouquet={bouquet} hovered={hoveredFlower} />
      </div>
      <span className={styles.divider}></span>
      {steps.current === 1 ? (
        <div className="column">
          <BouquetBuilder
            bouquet={bouquet}
            flowers={flowers}
            selectFlower={selectFlower}
            onHover={setHoveredFlower}
            nextCta="Delivery details"
            nextStep={nextStep}
            navigation={navigation}
          />
        </div>
      ) : (
        <div className="column">
          <PersonDetails
            recipient={recipient}
            sender={sender}
            updateField={updateField}
            prevCta="Change bouquet"
            nextCta="Confirm"
            prevStep={prevStep}
            navigation={navigation}
          />
        </div>
      )}
    </div>
  );
}
