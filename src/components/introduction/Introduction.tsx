import Anchor from "../Anchor";
import ParagraphDecoration from "../ParagraphDecoration";
import styles from "./Introduction.module.css";

export default function Introduction() {
  return (
    <div id="introduction" className={styles["single-column"]}>
      <header>
        <ParagraphDecoration />
        <h1>
          <span>Some things are unutterable and secret.</span>
          <span>Other thoughts are so hard to say...</span>
        </h1>
        <ParagraphDecoration reflected />
      </header>

      <div className="description" data-load="rise">
        <p>Thank Heavens for floriography. A mysterious language of love.</p>

        <p>
          Cryptic communications, hidden revelations and coded declarations!
        </p>
      </div>

      <p className={styles.cta} data-load="rise">
        We would like to invite you
        <br />
        to send your very own coded bouquet.
      </p>

      <nav className="navigation" data-load="rise">
        <Anchor cta="Let's begin" step="forward" target="build-bouquet" />
      </nav>
    </div>
  );
}
