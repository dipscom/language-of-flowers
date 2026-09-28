import { useEffect } from "react";
import type { ChangeEvent } from "react";
import Button from "./Button";
import Anchor from "./Anchor";
import ResetScroller from "../animation/ResetScroller";
import type { Navigation, Person } from "../types";
import ParagraphDecoration from "./ParagraphDecoration";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface PersonDetailsProps {
  index: "recipient" | "sender";
  recipient?: Person;
  sender?: Person;
  heading: string;
  prevCta: string;
  nextCta: string;
  prevStep: () => void;
  nextStep: string | (() => void);
  updateField: (e: ChangeEvent<HTMLInputElement>) => void;
  enableButton: () => void;
  navigation: Navigation;
}

export default function PersonDetails(props: PersonDetailsProps) {
  const {
    index,
    heading,
    prevCta,
    nextCta,
    prevStep,
    nextStep,
    updateField,
    enableButton,
    navigation,
  } = props;
  const person = index === "recipient" ? props.recipient! : props.sender!;

  useEffect(() => {
    if (window.innerHeight > window.innerWidth) {
      document.getElementById("hero-image")?.classList.add("hide-portrait");
    }
    if (enableButton) {
      enableButton();
    }
    ResetScroller("form");
  }, []);

  const isValid = person.name !== "" && person.valid;
  let disabled: boolean | "disabled" | undefined;
  if (typeof nextStep === "string") {
    disabled = isValid && !navigation.disabled ? undefined : "disabled";
  } else {
    disabled = isValid && !navigation.disabled ? undefined : true;
  }
  return (
    <div id={index} className="person-details">
      <form>
        <header>
          <h1>{heading}</h1>
          <ParagraphDecoration />
        </header>
        <label htmlFor="name">
          {capitalizeFirstLetter(index)}&rsquo;s full name
        </label>
        <input
          type="text"
          id="name"
          className={index}
          name="name"
          maxLength={20}
          value={person.name}
          placeholder="Full Name"
          required
          onChange={(e) => updateField(e)}
          autoComplete="off"
          tabIndex={1}
        />
        <label htmlFor="email">
          {capitalizeFirstLetter(index)}&rsquo;s email
        </label>
        <input
          type="email"
          id="email"
          className={index}
          name="email"
          value={person.email}
          placeholder="Email"
          required
          onChange={(e) => updateField(e)}
        />
        <Button
          className="back-button"
          cta={prevCta}
          step={prevStep}
          disabled={navigation.disabled}
        />
        {index === "recipient" ? (
          <p className="terms">
            Contact details for the recipient should only be provided with that
            person&rsquo;s consent, and that person may be told who provided their
            details.
          </p>
        ) : (
          ""
        )}
      </form>
      {typeof nextStep === "string" ? (
        <Anchor
          className={typeof disabled === "string" ? disabled : undefined}
          cta={nextCta}
          step="forward"
          target="confirmation"
        />
      ) : (
        <Button
          className="button"
          cta={nextCta}
          disabled={typeof disabled === "boolean" ? disabled : false}
          step={nextStep}
        />
      )}
    </div>
  );
}
