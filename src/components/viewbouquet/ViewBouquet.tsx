import BouquetDetails from "../BouquetDetails";
import HeroImage from "../HeroImage";
import TwoColumn, { Column } from "../twocolumn/TwoColumn";
import { useAppState } from "../../state/useAppState";

export default function ViewBouquet() {
  const { bouquet, flowers } = useAppState();

  return (
    <TwoColumn>
      <Column>
        <HeroImage bouquet={bouquet} />
      </Column>
      <Column>
        <BouquetDetails bouquet={bouquet} flowers={flowers} />
      </Column>
    </TwoColumn>
  );
}
