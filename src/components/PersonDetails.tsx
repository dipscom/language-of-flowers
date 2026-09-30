import type { ChangeEvent } from "react";
import Button from "./Button";
import type { Navigation, Person, Sender } from "../types";
import ParagraphDecoration from "./ParagraphDecoration";

interface PersonDetailsProps {
  recipient: Person;
  sender: Sender;
  prevCta: string;
  nextCta: string;
  prevStep: () => void;
  confirm: () => void;
  updateField: (e: ChangeEvent<HTMLInputElement>) => void;
  navigation: Navigation;
}

export default function PersonDetails({
  recipient,
  sender,
  prevCta,
  nextCta,
  prevStep,
  confirm,
  updateField,
  navigation,
}: PersonDetailsProps) {
  const isValid = sender.name !== "" && recipient.name !== "" && recipient.valid;
  const disabled = !isValid || navigation.disabled;
  return (
    <div id="person-details" className="person-details">
      <form>
        <div className="heading">
          <p>Your details</p>
          <ParagraphDecoration />
        </div>
        <label htmlFor="sender-name">Your full name</label>
        <input
          type="text"
          id="sender-name"
          className="sender"
          name="name"
          maxLength={20}
          value={sender.name}
          placeholder="Full Name"
          required
          onChange={(e) => updateField(e)}
          autoComplete="off"
          tabIndex={1}
        />
        <label htmlFor="recipient-name">Recipient&rsquo;s full name</label>
        <input
          type="text"
          id="recipient-name"
          className="recipient"
          name="name"
          maxLength={20}
          value={recipient.name}
          placeholder="Full Name"
          required
          onChange={(e) => updateField(e)}
          autoComplete="off"
        />
        <label htmlFor="recipient-email">Recipient&rsquo;s email</label>
        <input
          type="email"
          id="recipient-email"
          className="recipient"
          name="email"
          value={recipient.email}
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
        <p className="terms">
          Contact details for the recipient should only be provided with that
          person&rsquo;s consent, and that person may be told who provided their
          details.
        </p>
      </form>
      <Button
        className="button"
        cta={nextCta}
        disabled={disabled}
        step={confirm}
      />
    </div>
  );
}
