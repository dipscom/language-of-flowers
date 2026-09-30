import styles from "./Overlay.module.css";

export default function Overlay() {
  return (
    <div className={styles.overlay} key="overlay">
      <img className={styles.man} src="/images/overlay/man.png" alt="" />

      <img
        src="/images/overlay/flowers-bottomright.png"
        alt=""
        className={`${styles.flowersBottomRight} ${styles.bottom} ${styles.right}`}
      />

      <img
        src="/images/overlay/flowers-midleft.png"
        alt=""
        className={`${styles.flowersMidLeft} ${styles.left}`}
      />

      <img className={styles.lady} src="/images/overlay/lady.png" alt="" />

      <img
        className={`${styles.flowersBottom} ${styles.bottom} ${styles.left}`}
        src="/images/overlay/flowers-bottom.png"
        alt=""
      />

      <img
        src="/images/overlay/flowers-topleft.png"
        alt=""
        className={`${styles.flowersTopLeft} ${styles.top} ${styles.left}`}
      />

      <img
        src="/images/overlay/flowers-topright.png"
        alt=""
        className={`${styles.flowersTopRight} ${styles.top} ${styles.right}`}
      />

      <img className={styles.peacock} src="/images/overlay/peacock.png" alt="" />
      <img className={styles.stag} src="/images/overlay/stag.png" alt="" />
    </div>
  );
}
