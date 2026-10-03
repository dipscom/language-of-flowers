import { Navigate, useLocation } from "react-router";
import Anchor from "../Anchor";
import BouquetVisualiser from "../bouquetvisualiser/BouquetVisualiser";
import PageHeader from "../PageHeader";
import TwoColumn, { Column } from "../twocolumn/TwoColumn";

interface SuccessLocationState {
  bouquet: string[];
}

export default function Success() {
  const state = useLocation().state as SuccessLocationState | null;

  // The sent bouquet arrives through the navigation state; without it (e.g. a
  // direct visit) there is nothing to show, so start the journey again.
  if (!state?.bouquet?.length) {
    return <Navigate to="/build-bouquet" replace />;
  }

  return (
    <TwoColumn>
      <Column centered>
        <PageHeader title="Thank You!" />
        <p>Your encoded bouquet has been sent.</p>

        <p>Would you like to send another bouquet?</p>

        <p>
          <Anchor cta="start again" step="forward" target="build-bouquet" />
        </p>
      </Column>
      <Column>
        <BouquetVisualiser bouquet={state.bouquet} />
      </Column>
    </TwoColumn>
  );
}
