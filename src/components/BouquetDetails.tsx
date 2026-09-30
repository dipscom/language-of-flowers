import { useEffect } from "react";
import Button from "./Button";
import Flower from "./Flower";
import useScrollContainer from "./scrollcontainer/useScrollContainer";
import type { FlowersById, Navigation } from "../types";
import ParagraphDecoration from "./ParagraphDecoration";

interface BouquetDetailsProps {
  bouquet: string[];
  flowers: FlowersById;
  step?: number;
  prevCta?: string;
  nextCta?: string;
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
  const { resetScroll } = useScrollContainer();

  useEffect(() => {
    resetScroll();
    if (enableButton) {
      enableButton();
    }
  }, []);

  return (
    <div id="bouquet-details">
      <div>
        <header>
          <h1>Your Bouquet</h1>
          <ParagraphDecoration />
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
        {step === 2 && (
          <Button
            className="button"
            cta={nextCta!}
            step={nextStep!}
            disabled={navigation.disabled}
          />
        )}
      </div>
    </div>
  );
}
