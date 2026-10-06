import { useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router";
import BouquetVisualiser from "../bouquetvisualiser/BouquetVisualiser";
import PageHeader from "../PageHeader";
import PersonDetails from "../PersonDetails";
import TwoColumn, { Column } from "../twocolumn/TwoColumn";
import { MAX_FLOWERS } from "../../state/appReducer";
import { useAppState } from "../../state/useAppState";

export default function Details() {
  const {
    bouquet,
    slots,
    freeSlots,
    recipient,
    sender,
    savePersonDetails,
    mailChimp,
    reset,
  } = useAppState();

  const navigate = useNavigate();
  const confirmed = useRef(false);

  // After a confirmation the app state is cleared so going back starts a fresh
  // journey, but only once this page is gone: it stays mounted under the page
  // flip, and clearing sooner would empty it (and send it back to
  // /build-bouquet) while it is still being turned away.
  useEffect(
    () => () => {
      if (confirmed.current) reset();
    },
    [reset],
  );

  // The bouquet only lives in memory, so a refresh or a direct visit arrives
  // without one: start the journey again.
  if (bouquet.length < MAX_FLOWERS) {
    return <Navigate to="/build-bouquet" replace />;
  }

  function confirm() {
    mailChimp(); // placeholder for the external send, implemented later
    // The sent bouquet is handed to /success through the navigation state.
    confirmed.current = true;
    navigate("/success", { state: { bouquet } });
  }

  return (
    <TwoColumn>
      <Column>
        <PageHeader title="Create your bouquet" />
        <PersonDetails
          recipient={recipient}
          sender={sender}
          savePersonDetails={savePersonDetails}
          confirm={confirm}
        />
      </Column>
      <Column>
        <BouquetVisualiser
          bouquet={slots}
          hovered={null}
          hoveredSlot={freeSlots[0]}
        />
      </Column>
    </TwoColumn>
  );
}
