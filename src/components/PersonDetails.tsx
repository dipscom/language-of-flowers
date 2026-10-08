import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useNavigate } from "react-router";
import type { PersonDetailsValues, Person, Sender } from "../types";
import { BUILD_BOUQUET_PATH } from "../routes";
import form from "./BuildForm.module.css";
import styles from "./PersonDetails.module.css";

interface PersonDetailsProps {
  recipient: Person;
  sender: Sender;
  confirm: (details: PersonDetailsValues) => Promise<void>;
  error: string | null;
  savePersonDetails: (details: PersonDetailsValues) => void;
}

// Lives inside the form so useFormStatus can follow the pending send.
function SendButton({ valid }: { valid: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button className="button" disabled={!valid || pending}>
      {pending ? "Dispatching…" : "Dispatch"}
    </button>
  );
}

function readDetails(data: FormData): PersonDetailsValues {
  return {
    senderName: String(data.get("senderName") ?? ""),
    recipientName: String(data.get("recipientName") ?? ""),
    recipientEmail: String(data.get("recipientEmail") ?? ""),
  };
}

export default function PersonDetails({
  recipient,
  sender,
  confirm,
  error,
  savePersonDetails,
}: PersonDetailsProps) {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [valid, setValid] = useState(false);
  const alertRef = useRef<HTMLParagraphElement>(null);

  // Bring a send failure to the attention of keyboard and screen reader users.
  useEffect(() => {
    if (error) alertRef.current?.focus();
  }, [error]);

  // Prefilled values may already make the form valid.
  useEffect(() => {
    setValid(formRef.current!.checkValidity());
  }, []);

  return (
    <form
      ref={formRef}
      onChange={(e) => setValid(e.currentTarget.checkValidity())}
      id="person-details"
      className={[form.form, styles.form].join(" ")}
      action={async (data) => {
        const details = readDetails(data);
        savePersonDetails(details);
        await confirm(details);
      }}
    >
      <p className={form["sub-heading"]}>To whom, and where?</p>

      <div className={form.field}>
        <label htmlFor="sender-name">Your name*</label>
        <input
          type="text"
          id="sender-name"
          name="senderName"
          maxLength={20}
          defaultValue={sender.name}
          placeholder="A Secret Admirer"
          required
        />
      </div>
      <div className={form.field}>
        <label htmlFor="recipient-name">Their name*</label>
        <input
          type="text"
          id="recipient-name"
          name="recipientName"
          maxLength={20}
          defaultValue={recipient.name}
          placeholder="Your Beloved"
          required
        />
      </div>
      <div className={form.field}>
        <label htmlFor="recipient-email">Their email*</label>
        <input
          type="email"
          id="recipient-email"
          name="recipientEmail"
          defaultValue={recipient.email}
          placeholder="dearest.one@example.com"
          required
        />
      </div>
      {error && (
        <p role="alert" ref={alertRef} tabIndex={-1}>
          {error}. Pray try again.
        </p>
      )}
      <SendButton valid={valid} />
      <p className={styles.terms}>
        Kindly provide the recipient&rsquo;s address only with their consent.
        Nothing is kept. The address is used solely to dispatch this one
        message, and neither it nor any other detail is saved on our side.
      </p>
      <button
        type="button"
        className="button back-button"
        onClick={(e) => {
          savePersonDetails(readDetails(new FormData(e.currentTarget.form!)));
          navigate(BUILD_BOUQUET_PATH);
        }}
      >
        Reconsider the blooms
      </button>
    </form>
  );
}
