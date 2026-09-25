import { useAppState } from "../state/AppStateContext";

function renderProduct(products, key) {
  const product = products[key];
  const styles = {
    backgroundImage: "url(/images/products/" + key + ".png)",
  };
  return (
    <li key={key}>
      <a href={product.link} target="_blank" title={product.name}>
        <figure style={styles}></figure>
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Buy now</p>
        </div>
      </a>
    </li>
  );
}

export default function Success() {
  const { products } = useAppState();
  return (
    <div id="success" className="page">
      <div id="scroller">
        <div id="thank-you">
          <header>
            <h1>Thank You!</h1>
            <hr />
          </header>
          <p>
            <strong>Your encoded bouquet has been sent.</strong>
          </p>
        </div>
        <div id="products">
          <p>
            <strong>
              Why not match one of our
              <a href="#" target="_blank" title="Portraits Fragrances">
                Portraits Collection
              </a>{" "}
              to your bouquet...
            </strong>
          </p>
          <hr />
          <ul>
            {Object.keys(products).map((key) => renderProduct(products, key))}
          </ul>
          <hr className="reflected" />
          <p>
            <strong>
              Alternatively you can find your perfect scent with our online{" "}
              <a
                href="#"
                target="_blank"
                title="Fragrance Profiling Experience"
              >
                Fragrance Profiling Experience
              </a>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}
