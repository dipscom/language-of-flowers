import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
    mailChimp,
    reset,
  } = useAppState();

  const { resetScroll } = useScrollContainer();
  const navigate = useNavigate();
  const [hoveredFlower, setHoveredFlower] = useState<string | null>(null);

  useEffect(() => {
    resetScroll();
    enableButton();
  }, [steps.current]);

  function confirm() {
    mailChimp(); // placeholder for the external send, implemented later
    // Hand the sent bouquet to /success through the navigation state, then clear
    // the app state so going back starts a fresh journey. Both happen in one
    // event handler, so React batches them into a single render.
    navigate("/success", { state: { bouquet } });
    reset();
  }

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
            confirm={confirm}
            navigation={navigation}
          />
        </div>
      )}
    </div>
  );
}
