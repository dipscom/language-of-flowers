import { Navigate, useLocation } from "react-router";
import Anchor from "../Anchor";
import BouquetVisualiser from "../bouquetvisualiser/BouquetVisualiser";
import ParagraphDecoration from "../ParagraphDecoration";
import styles from "./Success.module.css";

interface SuccessLocationState {
  bouquet: string[];
}

export default function Success() {
  const state = useLocation().state as SuccessLocationState | null;

  // The sent bouquet arrives through the navigation state; without it (e.g. a
  // direct visit) there is nothing to show, so start the journey again.
  if (!state?.bouquet?.length) {
    return <Navigate to="/build-bouquet" replace />;
  }

  return (
    <div className={styles.success}>
      <div className="column">
        <BouquetVisualiser bouquet={state.bouquet} />
      </div>
      <span className={styles.divider}></span>
      <div className="column">
        <div id="thank-you">
          <header>
            <h1>Thank You!</h1>
            <ParagraphDecoration />
          </header>
          <p>
            <strong>Your encoded bouquet has been sent.</strong>
          </p>

          <p>Would you like to send another bouquet?</p>

          <p>
            <Anchor cta="start again" step="forward" target="build-bouquet" />
          </p>
        </div>
      </div>
    </div>
  );
}
