import { Fragment } from "react";
import type { FlowersById } from "../../types";
import { joinMeanings, joinNames } from "../../bouquetMessage";
import styles from "./BouquetDetails.module.css";

interface BouquetDetailsProps {
  bouquet: string[];
  flowers: FlowersById;
  sender?: string;
}

export default function BouquetDetails({
  bouquet,
  flowers,
  sender,
}: BouquetDetailsProps) {
  return (
    <div id="bouquet-details" className={styles.details}>
      <p>
        {sender ?? "Someone"} has picked{" "}
        <strong>{joinNames(bouquet, flowers)}</strong> to make a beautiful
        bouquet for you. Together they speak of{" "}
        <strong>{joinMeanings(bouquet, flowers)}</strong>, a reflection of what
        you mean to them.
      </p>

      <dl className={styles["flower-meanings"]}>
        {bouquet.map((key) => (
          <Fragment key={key}>
            <dt className={styles["meaning-name"]}>{flowers[key].name}</dt>
            <dd>{flowers[key].description}</dd>
          </Fragment>
        ))}
      </dl>

      <p>
        Are you a{" "}
        <a
          href="https://en.wikipedia.org/wiki/Language_of_flowers"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          floriography
        </a>{" "}
        enthusiast?
      </p>
    </div>
  );
}
