import Anchor from "./Anchor";

export default function Description() {
  return (
    <div id="description" key="description" className="page">
      <div>
        <div>
          <header>
            <hr />
            <h1>Blooming lovely bouquets</h1>
            <hr className="reflected" />
          </header>
          <p>
            With our floriography messages of love and admiration can be relayed
            to those dearest to your heart, those whose footsteps you follow and
            those who reside on top of a rather high pedestal.
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
