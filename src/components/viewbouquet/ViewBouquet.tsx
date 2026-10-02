import BouquetDetails from "../BouquetDetails";
import HeroImage from "../HeroImage";
import TwoColumn, { Column } from "../twocolumn/TwoColumn";
import { useSmallLogo } from "../scrollcontainer/useScrollContainer";
import { useAppState } from "../../state/useAppState";

export default function ViewBouquet() {
  useSmallLogo();
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
