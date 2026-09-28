import Anchor from "../Anchor";
import ParagraphDecoration from "../ParagraphDecoration";
import "./introduction.css";

export default function Introduction() {
  return (
    <div id="introduction" key="introduction" className="page">
      <div className="scroll-container">
        <div className="main-column">
          <div className="heading">
            <ParagraphDecoration />

            <p>Some things are unutterable and secret.</p>

            <p>Other thoughts are so hard to say...</p>

            <ParagraphDecoration reflected />
          </div>

          <div className="description">
            <p>
              Thank Heavens for floriography. A mysterious language of love.
            </p>

            <p>
              Cryptic communications, hidden revelations and coded declarations!
            </p>
          </div>

          <p className="cta">
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
