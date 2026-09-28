import Anchor from "./Anchor";

export default function Description() {
  return (
    <div id="description" key="description" className="page">
      <div>
        <div>
          <header>
            <hr />
            <h1>Bouquets full of hidden meaning.</h1>
            <hr className="reflected" />
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
      </div>
    </div>
  );
}
