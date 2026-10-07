import { Navigate, useSearchParams } from "react-router";
import BouquetDetails from "../BouquetDetails";
import BouquetVisualiser from "../bouquetvisualiser/BouquetVisualiser";
import TwoColumn, { Column } from "../twocolumn/TwoColumn";
import { MAX_FLOWERS } from "../../state/appReducer";
import { useAppState } from "../../state/useAppState";

export default function ViewBouquet() {
  const { flowers } = useAppState();
  const [params] = useSearchParams();

  // The emailed link carries the bouquet as comma-separated flower keys.
  const bouquet = (params.get("bouquet") ?? "")
    .split(",")
    .filter((key) => Object.hasOwn(flowers, key))
    .slice(0, MAX_FLOWERS);

  if (bouquet.length === 0) return <Navigate to="/" replace />;

  return (
    <TwoColumn>
      <Column>
        <BouquetVisualiser bouquet={bouquet} />
      </Column>
      <Column>
        <BouquetDetails bouquet={bouquet} flowers={flowers} />
      </Column>
    </TwoColumn>
  );
}
