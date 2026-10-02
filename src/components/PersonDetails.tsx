import type { PersonDetailsValues, Person, Sender } from "../types";
import form from "./BuildForm.module.css";

interface PersonDetailsProps {
  recipient: Person;
  sender: Sender;
  prevStep: () => void;
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
  prevStep,
  confirm,
  savePersonDetails,
}: PersonDetailsProps) {
  return (
    <form
      id="person-details"
      className={form.form}
      action={(data) => {
        savePersonDetails(readDetails(data));
        confirm();
      }}
    >
      <p className={form["sub-heading"]}>Enter the delivery details</p>

      <p style={{ justifySelf: "start" }}>All fields are required.</p>
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
      <button
        type="button"
        className="button back-button"
        onClick={(e) => {
          savePersonDetails(readDetails(new FormData(e.currentTarget.form!)));
          prevStep();
        }}
      >
        Change bouquet
      </button>
      <p className="terms">
        Contact details for the recipient should only be provided with that
        person&rsquo;s consent, and that person may be told who provided their
        details.
      </p>
      <button className="button">Send bouquet</button>
    </form>
  );
}
