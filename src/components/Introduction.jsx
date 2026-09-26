import Anchor from "./Anchor";

export default function Introduction() {
  return (
    <div id="introduction" key="introduction" className="page">
      <div>
        <div>
          <figure id="main-logo">
            <a href="#" title="" target="_blank">
              <img
                src="./images/penhalions-logo.svg"
                alt="Logo - est. London 1870 - Portraits"
              />
            </a>
          </figure>
          <header>
            <hr />
            <h1>Mother knows best and she'd rather like some flowers...</h1>
            <hr className="reflected" />
          </header>

          <p>
            All hail mother, the creator and matriarch. The woman with
            extraordinarily good taste who deserves the very best. Thank Heavens
            for floriography. A language of love.
          </p>

          <p>
            <strong>We invite you to send your very own coded bouquet.</strong>
          </p>
          <nav className="navigation">
            <Anchor cta="Let's begin" step="forward" target="description" />
          </nav>
        </div>
      </div>
    </div>
  );
}
