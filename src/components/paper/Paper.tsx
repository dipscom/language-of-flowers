import styles from "./Paper.module.css";

export default function Paper() {
  return (
    <div className={styles.paper}>
      <img
        role="presentation"
        className={`${styles.cloud} ${styles.cloud1}`}
        src="/images/background/cloud-1.png"
      />
      <img
        role="presentation"
        className={`${styles.cloud} ${styles.cloud2}`}
        src="/images/background/cloud-2.png"
      />
      <div className={styles["line-top-wrapper"]} />
      <div className={styles["line-left-wrapper"]} />
      <div className={styles["line-right-wrapper"]} />
      <div className={styles["line-bottom-wrapper"]} />
      <img
        role="presentation"
        className={`${styles.corner} ${styles["top-left"]}`}
        src="/images/background/detail-corner.svg"
      />
      <img
        role="presentation"
        className={`${styles.corner} ${styles["top-right"]}`}
        src="/images/background/detail-corner.svg"
      />
      <img
        role="presentation"
        className={`${styles.corner} ${styles["bottom-left"]}`}
        src="/images/background/detail-corner.svg"
      />
      <img
        role="presentation"
        className={`${styles.corner} ${styles["bottom-right"]}`}
        src="/images/background/detail-corner.svg"
      />
    </div>
  );
}
