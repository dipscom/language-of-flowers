import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import type { PersonDetailsValues, Person, Sender } from "../types";
import form from "./BuildForm.module.css";
import styles from "./PersonDetails.module.css";

interface PersonDetailsProps {
  recipient: Person;
  sender: Sender;
  confirm: () => void;
  savePersonDetails: (details: PersonDetailsValues) => void;
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
  savePersonDetails,
}: PersonDetailsProps) {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [valid, setValid] = useState(false);

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
      action={(data) => {
        savePersonDetails(readDetails(data));
        confirm();
      }}
    >
      <p className={form["sub-heading"]}>Enter the delivery details</p>

      <p className={styles.terms} style={{ justifySelf: "start" }}>
        All fields are required.
      </p>
      <div className={form.field}>
        <label htmlFor="sender-name">Your name*</label>
        <input
          type="text"
          id="sender-name"
          name="senderName"
          maxLength={20}
          defaultValue={sender.name}
          placeholder="Yours Truly"
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
          placeholder="Darling Sweetheart"
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
          placeholder="my.darling@example.com"
          required
        />
      </div>
      <button className="button" disabled={!valid}>
        Send bouquet
      </button>
      <p className={styles.terms}>
        Contact details for the recipient should only be provided with that
        person&rsquo;s consent, and that person may be told who provided their
        details.
      </p>
      <button
        type="button"
        className="button back-button"
        onClick={(e) => {
          savePersonDetails(readDetails(new FormData(e.currentTarget.form!)));
          navigate("/build-bouquet");
        }}
      >
        Change bouquet
      </button>
    </form>
  );
}
