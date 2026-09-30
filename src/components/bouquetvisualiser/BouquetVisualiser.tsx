import styles from "./BouquetVisualiser.module.css";

interface BouquetVisualiserProps {
  bouquet: string[];
  hovered?: string | null;
  hideInPortrait?: boolean;
}

export default function BouquetVisualiser({
  bouquet,
  hovered,
  hideInPortrait,
}: BouquetVisualiserProps) {
  // Selected flowers stack in selection order; a hovered flower goes on top.
  const layers =
    hovered && !bouquet.includes(hovered) ? [...bouquet, hovered] : bouquet;
  const classes = [styles.bouquetVisualiser, hideInPortrait && styles.hideInPortrait]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes}>
      {layers.map((flower) => (
        <img
          key={flower}
          className={styles.flower}
          src={"/images/flowers/" + flower + ".png"}
          alt=""
        />
      ))}
    </div>
  );
}
