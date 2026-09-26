import { useEffect } from "react";
import Button from "./Button";
import Anchor from "./Anchor";
import ResetScroller from "../animation/ResetScroller";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function PersonDetails(props) {
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
  const person = props[index];

  useEffect(() => {
    if (window.innerHeight > window.innerWidth) {
      document.getElementById("hero-image")?.classList.add("hide-portrait");
    }
    if (enableButton) {
      enableButton();
    }
    ResetScroller("form");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValid = person.name !== "" && person.valid;
  let disabled;
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
          <hr />
        </header>
        <label htmlFor="name">
          {capitalizeFirstLetter(index)}&rsquo;s full name
        </label>
        <input
          type="text"
          id="name"
          className={index}
          name="name"
          maxLength="20"
          value={person.name}
          placeholder="Full Name"
          required
          onChange={(e) => updateField(e)}
          autoComplete="off"
          tabIndex="1"
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
          autocomplete="off"
          tabIndex="2"
        />
        {index === "recipient" ? (
          <p className="terms">
            Contact details for the recipient should only be provided with that
            person's consent, and that person may be told who provided their
            details.
          </p>
        ) : (
          ""
        )}
      </form>
      {typeof nextStep === "string" ? (
        <Anchor
          className={disabled}
          cta={nextCta}
          step="forward"
          target="confirmation"
        />
      ) : (
        <Button
          className="button"
          cta={nextCta}
          disabled={disabled}
          step={nextStep}
        />
      )}
    </div>
  );
}
