import { Fragment } from "react";
import type { FlowersById } from "../../types";
import { joinMeanings, joinNames } from "../../bouquetMessage";
import { FLORIOGRAPHY_URL } from "../../routes";
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
        {sender ?? "A secret admirer"} has chosen{" "}
        <strong>{joinNames(bouquet, flowers)}</strong> and bound them into a
        bouquet for you. Together they whisper of{" "}
        <strong>{joinMeanings(bouquet, flowers)}</strong>: a confession of what
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
          href={FLORIOGRAPHY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          floriography
          <span className="sr-only"> (opens in a new tab)</span>
        </a>{" "}
        enthusiast?
      </p>
    </div>
  );
}
