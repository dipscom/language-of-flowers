import Anchor from "./Anchor";
import ParagraphDecoration from "./ParagraphDecoration";

export default function Description() {
  return (
    <div>
      <header>
        <ParagraphDecoration />
        <h1>Bouquets full of hidden meaning.</h1>
        <ParagraphDecoration reflected />
      </header>
      <p>
        With floriography, indiscrete messages can be relayed between
        sweethearts, paramours and sugar peas — but what could be more
        (ah-em) improbable!
      </p>
      <p>
        <strong>Choose the flowers wisely...</strong>
      </p>
      <nav className="navigation">
        <Anchor
          cta="Let's create your bouquet"
          step="forward"
          target="buildbouquet"
        />
      </nav>
    </div>
  );
}
