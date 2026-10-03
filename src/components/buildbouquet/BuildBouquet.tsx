import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BouquetBuilder from "../bouquetbuilder/BouquetBuilder";
import BouquetVisualiser from "../bouquetvisualiser/BouquetVisualiser";
import PageHeader from "../PageHeader";
import PersonDetails from "../PersonDetails";
import TwoColumn, { Column } from "../twocolumn/TwoColumn";
import { useAppState } from "../../state/useAppState";

export default function BuildBouquet() {
  const {
    bouquet,
    slots,
    flowers,
    recipient,
    sender,
    steps,
    navigation,
    selectFlowers,
    savePersonDetails,
    nextStep,
    prevStep,
    enableButton,
    mailChimp,
    reset,
  } = useAppState();

  const navigate = useNavigate();
  const [hoveredFlower, setHoveredFlower] = useState<string | null>(null);

  useEffect(() => {
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
    <TwoColumn>
      <Column>
        <PageHeader title="Create your bouquet" />
        {steps.current === 1 ? (
          <BouquetBuilder
            bouquet={bouquet}
            flowers={flowers}
            selectFlowers={selectFlowers}
            onHover={setHoveredFlower}
            nextStep={nextStep}
            navigation={navigation}
          />
        ) : (
          <PersonDetails
            recipient={recipient}
            sender={sender}
            savePersonDetails={savePersonDetails}
            prevStep={prevStep}
            confirm={confirm}
          />
        )}
      </Column>
      <Column>
        <BouquetVisualiser bouquet={slots} hovered={hoveredFlower} />
      </Column>
    </TwoColumn>
  );
}
