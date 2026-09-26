import { useEffect } from "react";
import Anchor from "./Anchor";
import Button from "./Button";
import Flower from "./Flower";
import ResetScroller from "../animation/ResetScroller";
import type { FlowersById, Navigation } from "../types";

interface BouquetDetailsProps {
  bouquet: string[];
  flowers: FlowersById;
  step?: number;
  prevCta?: string;
  nextCta: string;
  prevStep?: () => void;
  nextStep?: () => void;
  enableButton?: () => void;
  navigation: Navigation;
}

export default function BouquetDetails({
  bouquet,
  flowers,
  step,
  prevCta,
  nextCta,
  prevStep,
  nextStep,
  enableButton,
  navigation,
}: BouquetDetailsProps) {
  useEffect(() => {
    ResetScroller("form");
    if (enableButton) {
      enableButton();
    }
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
          <Button
            className="back-button"
            cta={prevCta!}
            step={prevStep!}
            disabled={navigation.disabled}
          />
        ) : (
          ""
        )}
        {step === 2 ? (
          <Button
            className="button"
            cta={nextCta}
            step={nextStep!}
            disabled={navigation.disabled}
          />
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
