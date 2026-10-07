import { memo } from "react";
import type { FlowerData } from "../../types";
import styles from "./Flower.module.css";

interface FlowerProps {
  details: FlowerData;
  flowerKey: string;
}

function Flower({ details, flowerKey }: FlowerProps) {
  return (
    <li id={flowerKey} className={styles.flower}>
      <img
        className={styles.image}
        src={"/images/flowers/" + flowerKey + ".png"}
        alt={details.name}
      />

      <p className={styles.name}>{details.name}</p>

      <p className={styles.meaning}>{details.meaning}</p>
      <p className={styles.description}>{details.description}</p>
    </li>
  );
}

export default memo(Flower);
