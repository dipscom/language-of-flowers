import Anchor from "./Anchor";

export default function Introduction() {
  return (
    <div id="introduction" key="introduction" className="page">
      <div>
        <div>
          <header>
            <hr />
            <h1>
              Some things are unutterable and secret.
              <br />
              Other thoughts are so hard to say...
            </h1>
            <hr className="reflected" />
          </header>

          <p>
            Thank Heavens for floriography. A mysterious language of love.
            <br />
            Cryptic communications, hidden revelations and coded declarations!
          </p>

          <p>
            <strong>
              We would like to invite you to send your very own coded bouquet.
            </strong>
          </p>
          <nav className="navigation">
            <Anchor cta="Let's begin" step="forward" target="description" />
          </nav>
        </div>
      </div>
    </div>
  );
}
