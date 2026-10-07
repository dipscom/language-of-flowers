import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import BouquetVisualiser from "../bouquetvisualiser/BouquetVisualiser";
import PageHeader from "../PageHeader";
import PersonDetails from "../PersonDetails";
import TwoColumn, { Column } from "../twocolumn/TwoColumn";
import { MAX_FLOWERS } from "../../state/appReducer";
import { sendBouquet } from "../../api/sendBouquet";
import { useAppState } from "../../state/useAppState";
import type { PersonDetailsValues } from "../../types";

export default function Details() {
  const {
    bouquet,
    slots,
    freeSlots,
    recipient,
    sender,
    savePersonDetails,
    markSent,
    reset,
  } = useAppState();

  const navigate = useNavigate();
  const confirmed = useRef(false);
  const [error, setError] = useState<string | null>(null);

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

  // The bouquet survives a refresh through session storage, so only a direct
  // visit arrives without one: start the journey again.
  if (bouquet.length < MAX_FLOWERS) {
    return <Navigate to="/build-bouquet" replace />;
  }

  async function confirm(details: PersonDetailsValues) {
    setError(null);
    const result = await sendBouquet(details, bouquet);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    // The sent bouquet is handed to /success through the app state, which also
    // clears the session storage.
    confirmed.current = true;
    markSent(bouquet);
    navigate("/success");
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
          error={error}
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
