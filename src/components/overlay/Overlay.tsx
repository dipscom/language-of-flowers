import styles from "./Overlay.module.css";

export default function Overlay() {
  return (
    <div
      className={styles.overlay}
      key="overlay"
      data-load="overlay"
    >
      <img data-overlay="flowers-bottom-right"
        src="/images/overlay/flowers-bottomright.png"
        alt=""
        className={`${styles["flowers-bottom-right"]} ${styles.bottom} ${styles.right}`}
      />

      <img data-overlay="man" className={styles.man} src="/images/overlay/man.png" alt="" />

      <img data-overlay="flowers-mid-left"
        src="/images/overlay/flowers-midleft.png"
        alt=""
        className={`${styles["flowers-mid-left"]} ${styles.left}`}
      />

      <img data-overlay="lady" className={styles.lady} src="/images/overlay/lady.png" alt="" />

      <img data-overlay="flowers-bottom"
        className={`${styles["flowers-bottom"]} ${styles.bottom} ${styles.left}`}
        src="/images/overlay/flowers-bottom.png"
        alt=""
      />

      <img data-overlay="flowers-top-left"
        src="/images/overlay/flowers-topleft.png"
        alt=""
        className={`${styles["flowers-top-left"]} ${styles.top} ${styles.left}`}
      />

      <img data-overlay="flowers-top-right"
        src="/images/overlay/flowers-topright.png"
        alt=""
        className={`${styles["flowers-top-right"]} ${styles.top} ${styles.right}`}
      />

      <img data-overlay="peacock"
        className={styles.peacock}
        src="/images/overlay/peacock.png"
        alt=""
      />
      <img data-overlay="stag" className={styles.stag} src="/images/overlay/stag.png" alt="" />
    </div>
  );
}
