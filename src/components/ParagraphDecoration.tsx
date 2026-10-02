import styles from "./ParagraphDecoration.module.css";

interface ParagraphDecorationProps {
  reflected?: boolean;
}

export default function ParagraphDecoration({
  reflected,
}: ParagraphDecorationProps) {
  return (
    <div
      className={
        reflected
          ? `${styles.paragraphDecoration} ${styles.reflected}`
          : styles.paragraphDecoration
      }
    >
      <div className={styles.left}></div>
      <div className={styles.right}></div>
      <div className={styles.left}></div>
      <div className={styles.right}></div>
    </div>
  );
}
