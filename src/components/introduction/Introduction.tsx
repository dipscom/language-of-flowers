import Anchor from "../Anchor";
import ParagraphDecoration from "../ParagraphDecoration";
import { FLORIOGRAPHY_URL } from "../../routes";
import styles from "./Introduction.module.css";

export default function Introduction() {
  return (
    <div id="introduction" className={styles["single-column"]}>
      <header>
        <ParagraphDecoration />
        <h1>
          <span>
            Some matters are too delicate to utter, and too dear to confess.
          </span>
          <span>Other sentiments simply refuse to be spoken aloud...</span>
        </h1>
        <ParagraphDecoration reflected />
      </header>

      <div className="description">
        <p>
          Thank Heavens for{" "}
          <a href={FLORIOGRAPHY_URL} target="_blank" rel="noopener noreferrer">
            floriography
          </a>
          : the secret tongue of the heart, spoken in petals.
        </p>

        <p>Veiled messages, secret assignations and declarations in cipher!</p>
      </div>

      <p className={styles.cta}>
        We should be honoured if you would
        <br />
        compose a bouquet of your own, and let the blooms speak in your stead.
      </p>

      <nav className="navigation">
        <Anchor cta="Pray, begin" step="forward" target="build-bouquet" />
      </nav>

      <p className={styles["cookie-notice"]}>
        This site does not use cookies, and does not collect any personal data.
        <br />
        It is intended for personal use only, and is not a commercial service.
      </p>
    </div>
  );
}
