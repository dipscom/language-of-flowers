import { Navigate } from "react-router";
import Anchor from "../Anchor";
import BouquetVisualiser from "../bouquetvisualiser/BouquetVisualiser";
import PageHeader from "../PageHeader";
import TwoColumn, { Column } from "../twocolumn/TwoColumn";
import { useAppState } from "../../state/useAppState";

export default function Success() {
  const { sentBouquet } = useAppState();

  // The sent bouquet only lives in memory; without it (a reload or a direct
  // visit) there is nothing to show, so start the journey again.
  if (!sentBouquet.length) {
    return <Navigate to="/" replace />;
  }

  return (
    <TwoColumn>
      <Column centered>
        <PageHeader title="Safely Dispatched" />
        <p>Your bouquet is on its way, and your secret is safe with us.</p>

        <p>Is there another heart to be won?</p>

        <p>
          <Anchor cta="Compose another" step="forward" target="build-bouquet" />
        </p>
      </Column>
      <Column>
        <BouquetVisualiser bouquet={sentBouquet} />
      </Column>
    </TwoColumn>
  );
}
