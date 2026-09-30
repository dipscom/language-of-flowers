import Anchor from "./Anchor";
import Flower from "./Flower";
import { useAppState } from "../state/useAppState";
import ParagraphDecoration from "./ParagraphDecoration";

export default function Confirmation() {
  const { bouquet, flowers, recipient, sender, mailChimp } = useAppState();

  return (
    <div>
      <header>
        <h1>Confirm & Send</h1>
        <ParagraphDecoration />
      </header>
      <p>
        <strong>On this fine day we will send your message of:</strong>
      </p>
      <ol className="bouquet-list">
        {bouquet.map((key) => (
          <Flower key={key} index={key} details={flowers[key]} />
        ))}
      </ol>
      <p>
        <strong>
          ...to your dearest <span>{recipient.name}</span> at the email
          address of <span>{recipient.email}</span> from{" "}
          <span>{sender.name}</span> <span>({sender.email})</span>.
        </strong>
      </p>
      <nav className="navigation">
        <Anchor
          cta="Send now"
          step="forward"
          target="success"
          click={mailChimp}
        />
        <Anchor
          cta="Change details"
          step="backward"
          target="buildbouquet"
        />
      </nav>
    </div>
  );
}
