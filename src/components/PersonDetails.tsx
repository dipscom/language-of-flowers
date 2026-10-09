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
function SendButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {/* aria-disabled rather than disabled, so the button keeps focus. */}
      <button
        className="button"
        aria-disabled={pending}
        onClick={(e) => {
          if (pending) e.preventDefault();
        }}
      >
        {pending ? "Dispatching…" : "Dispatch"}
      </button>
      <p role="status" className="sr-only">
        {pending ? "Dispatching your bouquet" : ""}
      </p>
    </>
  );
}

type FieldName = "senderName" | "recipientName" | "recipientEmail";
type FieldErrors = Partial<Record<FieldName, string>>;

const FIELD_IDS: Record<FieldName, string> = {
  senderName: "sender-name",
  recipientName: "recipient-name",
  recipientEmail: "recipient-email",
};

function validate(details: PersonDetailsValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.senderName.trim()) errors.senderName = "Pray enter your name.";
  if (!details.recipientName.trim())
    errors.recipientName = "Pray enter their name.";
  const email = details.recipientEmail.trim();
  if (!email) {
    errors.recipientEmail = "Pray enter their email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.recipientEmail =
      "That email address looks amiss. Pray check it, e.g. dearest.one@example.com.";
  }
  return errors;
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
  const [errors, setErrors] = useState<FieldErrors>({});
  const alertRef = useRef<HTMLParagraphElement>(null);

  // Bring a send failure to the attention of keyboard and screen reader users.
  useEffect(() => {
    if (error) alertRef.current?.focus();
  }, [error]);

  return (
    <form
      ref={formRef}
      noValidate
      id="person-details"
      className={[form.form, styles.form].join(" ")}
      action={async (data) => {
        const details = readDetails(data);
        const found = validate(details);
        setErrors(found);
        const first = (Object.keys(FIELD_IDS) as FieldName[]).find(
          (name) => found[name],
        );
        if (first) {
          document.getElementById(FIELD_IDS[first])?.focus();
          return;
        }
        savePersonDetails(details);
        await confirm(details);
      }}
    >
      <h2 className={form["sub-heading"]}>To whom, and where?</h2>
      <p className={styles.required}>Fields marked * are required.</p>

      <div className={form.field}>
        <label htmlFor="sender-name">Your name*</label>
        <input
          type="text"
          id="sender-name"
          name="senderName"
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.senderName}
          aria-describedby={errors.senderName ? "sender-name-error" : undefined}
          maxLength={20}
          defaultValue={sender.name}
          placeholder="A Secret Admirer"
        />
        {errors.senderName && (
          <p id="sender-name-error" className={form.error}>
            {errors.senderName}
          </p>
        )}
      </div>
      <div className={form.field}>
        <label htmlFor="recipient-name">Their name*</label>
        <input
          type="text"
          id="recipient-name"
          name="recipientName"
          aria-required="true"
          aria-invalid={!!errors.recipientName}
          aria-describedby={
            errors.recipientName ? "recipient-name-error" : undefined
          }
          maxLength={20}
          defaultValue={recipient.name}
          placeholder="Your Beloved"
        />
        {errors.recipientName && (
          <p id="recipient-name-error" className={form.error}>
            {errors.recipientName}
          </p>
        )}
      </div>
      <div className={form.field}>
        <label htmlFor="recipient-email">Their email*</label>
        <input
          type="email"
          id="recipient-email"
          name="recipientEmail"
          aria-required="true"
          aria-invalid={!!errors.recipientEmail}
          aria-describedby={
            errors.recipientEmail ? "recipient-email-error" : undefined
          }
          defaultValue={recipient.email}
          placeholder="dearest.one@example.com"
        />
        {errors.recipientEmail && (
          <p id="recipient-email-error" className={form.error}>
            {errors.recipientEmail}
          </p>
        )}
      </div>
      {error && (
        <p ref={alertRef} tabIndex={-1}>
          {error}. Pray try again.
        </p>
      )}
      <SendButton />
      <p className={styles.terms}>
        Kindly provide the recipient&rsquo;s address only with their consent.
        The address is used solely to dispatch this one message, and neither it
        nor any other detail is used for anything else.
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
