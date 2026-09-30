import BouquetDetails from "../BouquetDetails";
import HeroImage from "../HeroImage";
import styles from "./ViewBouquet.module.css";
import { useAppState } from "../../state/useAppState";

export default function ViewBouquet() {
  const { bouquet, flowers } = useAppState();

  return (
    <div className={styles["view-bouquet"]}>
      <div className="column">
        <HeroImage bouquet={bouquet} />
      </div>
      <span className={styles.divider}></span>
      <div className="column">
        <BouquetDetails bouquet={bouquet} flowers={flowers} />
      </div>
    </div>
  );
}
