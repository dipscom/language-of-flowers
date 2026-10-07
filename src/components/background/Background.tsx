import styles from "./Background.module.css";

export default function Background() {
  return (
    <div className={styles.background}>
      <canvas
        aria-hidden="true"
        className={styles.forest}
        data-load="forest"
      ></canvas>
    </div>
  );
}
