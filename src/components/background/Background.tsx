import type { Location } from "react-router";
import styles from "./Background.module.css";

interface BackgroundProps {
  location: Location;
}

export default function Background({ location }: BackgroundProps) {
  const pathname = location && location.pathname;
  const hideLogo = pathname === "/";
  const compactLogo =
    pathname === "/buildbouquet" || pathname === "/viewbouquet";
  const logoClasses = [
    styles.logo,
    hideLogo && styles.hidden,
    compactLogo && styles.compact,
  ]
    .filter(Boolean)
    .join(" ");
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
        <img
          className={logoClasses}
          src="./images/lof-logo.svg"
          alt="The Language of Flowers"
          title="The Language of Flowers"
        />
      </div>
    </div>
  );
}
