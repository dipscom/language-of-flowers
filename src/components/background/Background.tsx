import styles from "./Background.module.css";

export default function Background() {
  return (
    <div className={styles.background}>
      <div className={styles.forest}></div>
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
        <div className={styles.lineTopWrapper}>
          <svg
            className={styles.lineDecoration}
            viewBox="0 0 1400 50"
            preserveAspectRatio="xMidYMin"
          >
            <path
              className="segment"
              d="M700 20 Q690 0.5, 660 0.5 H0"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="segment"
              d="M700 20 Q710 0.5, 740 0.5 H1400"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className={styles.lineLeftWrapper}>
          <svg className={styles.lineDecoration} viewBox="0 0 2 860">
            <path
              className="straight-segment"
              d="M0.5 0 V860"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className={styles.lineRightWrapper}>
          <svg className={styles.lineDecoration} viewBox="0 0 2 860">
            <path
              className="straight-segment"
              d="M0.5 0 V860"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className={styles.lineBottomWrapper}>
          <svg className={styles.lineDecoration} viewBox="0 0 1400 2">
            <path
              className="straight-segment"
              d="M0 0.5 H1400"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
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
    </div>
  );
}
