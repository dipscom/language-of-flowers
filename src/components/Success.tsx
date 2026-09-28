import Anchor from "./Anchor";
import { useAppState } from "../state/useAppState";
import ParagraphDecoration from "./ParagraphDecoration";

export default function Success() {
  const { reset } = useAppState();
  return (
    <div id="success" className="page">
      <div id="scroller">
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
            <Anchor cta="start again" step="forward" target="" click={reset} />
          </p>
        </div>
      </div>
    </div>
  );
}
