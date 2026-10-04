import BouquetDetails from "../BouquetDetails";
import BouquetVisualiser from "../bouquetvisualiser/BouquetVisualiser";
import TwoColumn, { Column } from "../twocolumn/TwoColumn";
import { useAppState } from "../../state/useAppState";

export default function ViewBouquet() {
  const { bouquet, flowers } = useAppState();

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
