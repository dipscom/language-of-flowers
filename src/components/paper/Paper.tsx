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
      <div className={styles.lineTopWrapper} />
      <div className={styles.lineLeftWrapper} />
      <div className={styles.lineRightWrapper} />
      <div className={styles.lineBottomWrapper} />
      <img
        role="presentation"
        className={`${styles.corner} ${styles.topLeft}`}
        src="/images/background/detail-corner.svg"
      />
      <img
        role="presentation"
        className={`${styles.corner} ${styles.topRight}`}
        src="/images/background/detail-corner.svg"
      />
      <img
        role="presentation"
        className={`${styles.corner} ${styles.bottomLeft}`}
        src="/images/background/detail-corner.svg"
      />
      <img
        role="presentation"
        className={`${styles.corner} ${styles.bottomRight}`}
        src="/images/background/detail-corner.svg"
      />
    </div>
  );
}
