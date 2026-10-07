import { Navigate, useSearchParams } from "react-router";
import BouquetDetails from "../bouquetdetails/BouquetDetails";
import BouquetVisualiser from "../bouquetvisualiser/BouquetVisualiser";
import PageHeader from "../PageHeader";
import TwoColumn, { Column } from "../twocolumn/TwoColumn";
import { MAX_FLOWERS } from "../../state/appReducer";
import { useAppState } from "../../state/useAppState";

// The names come from a link anyone can edit, so keep them to the form's limit.
const MAX_NAME_LENGTH = 20;

export default function ViewBouquet() {
  const { flowers } = useAppState();
  const [params] = useSearchParams();

  // The emailed link carries the bouquet as comma-separated flower keys.
  const bouquet = (params.get("bouquet") ?? "")
    .split(",")
    .filter((key) => Object.hasOwn(flowers, key))
    .slice(0, MAX_FLOWERS);

  if (bouquet.length === 0) return <Navigate to="/" replace />;

  const recipient = params.get("recipient")?.slice(0, MAX_NAME_LENGTH);
  const sender = params.get("sender")?.slice(0, MAX_NAME_LENGTH);

  return (
    <TwoColumn>
      <Column>
        <PageHeader
          title={recipient ? `A bouquet for ${recipient}` : "A bouquet for you"}
        />
        <BouquetDetails
          bouquet={bouquet}
          flowers={flowers}
          sender={sender}
        />
      </Column>
      <Column>
        <BouquetVisualiser bouquet={bouquet} />
      </Column>
    </TwoColumn>
  );
}
