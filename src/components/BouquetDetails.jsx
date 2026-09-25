import { useEffect } from "react";
import Anchor from "./Anchor";
import Button from "./Button";
import Flower from "./Flower";
import ResetScroller from "../animation/ResetScroller";

export default function BouquetDetails({
  bouquet,
  flowers,
  step,
  prevCta,
  nextCta,
  prevStep,
  nextStep,
  enableButton,
}) {
  useEffect(() => {
    ResetScroller("form");
    if (enableButton) {
      enableButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="bouquet-details">
      <div>
        <header>
          <h1>Your Bouquet</h1>
          <hr />
        </header>
        <ol className="bouquet-list">
          {step !== 2 ? (
            <li>
              <p className="message">
                Your beloved has sent you a beautiful floral bouquet. The
                meanings of their chosen flowers are listed below.
              </p>
            </li>
          ) : (
            ""
          )}

          {bouquet.map((key) => (
            <Flower key={key} index={key} details={flowers[key]} />
          ))}
        </ol>
        {step === 2 ? (
          <Button className="back-button" cta={prevCta} step={prevStep} />
        ) : (
          ""
        )}
        {step === 2 ? (
          <Button className="button" cta={nextCta} step={nextStep} />
        ) : (
          <Anchor
            className="center"
            cta={nextCta}
            step="forward"
            target="share"
          />
        )}
      </div>
    </div>
  );
}
