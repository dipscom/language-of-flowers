import type { PersonDetailsValues, Person, Sender } from "../types";

interface PersonDetailsProps {
  recipient: Person;
  sender: Sender;
  prevCta: string;
  nextCta: string;
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
  prevCta,
  nextCta,
  prevStep,
  confirm,
  savePersonDetails,
}: PersonDetailsProps) {
  return (
    <div id="person-details" className="person-details">
      <form
        action={(data) => {
          savePersonDetails(readDetails(data));
          confirm();
        }}
      >
        <label htmlFor="sender-name">Your name</label>
        <input
          type="text"
          id="sender-name"
          name="senderName"
          maxLength={20}
          defaultValue={sender.name}
          placeholder="Yours Truly"
          required
        />
        <label htmlFor="recipient-name">Their name</label>
        <input
          type="text"
          id="recipient-name"
          name="recipientName"
          maxLength={20}
          defaultValue={recipient.name}
          placeholder="Darling Sweetheart"
          required
        />
        <label htmlFor="recipient-email">Their email</label>
        <input
          type="email"
          id="recipient-email"
          name="recipientEmail"
          defaultValue={recipient.email}
          placeholder="my.darling@example.com"
          required
        />
        <button
          type="button"
          className="back-button"
          onClick={(e) => {
            savePersonDetails(readDetails(new FormData(e.currentTarget.form!)));
            prevStep();
          }}
        >
          {prevCta}
        </button>
        <p className="terms">
          Contact details for the recipient should only be provided with that
          person&rsquo;s consent, and that person may be told who provided their
          details.
        </p>
        <button className="button">{nextCta}</button>
      </form>
    </div>
  );
}
