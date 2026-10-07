import styles from "./Paper.module.css";

export default function Paper() {
  return (
    <>
      <div className={styles.paper} data-load="paper">
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
      <canvas
        aria-hidden="true"
        className={styles.crumple}
        data-load="crumple"
      ></canvas>
    </>
  );
}
