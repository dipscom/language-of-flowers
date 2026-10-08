import { useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router";
import { MAX_FLOWERS } from "../../state/appReducer";
import type { FlowersById } from "../../types";
import { DETAILS_PATH } from "../../routes";
import form from "../BuildForm.module.css";
import styles from "./BouquetBuilder.module.css";

interface BouquetBuilderProps {
  bouquet: string[];
  flowers: FlowersById;
  selectFlowers: (keys: string[]) => void;
  onHover: Dispatch<SetStateAction<string | null>>;
}

export default function BouquetBuilder({
  bouquet,
  flowers,
  selectFlowers,
  onHover,
}: BouquetBuilderProps) {
  const navigate = useNavigate();
  const [attempted, setAttempted] = useState(false);
  const short = bouquet.length < MAX_FLOWERS;

  return (
    <form
      id="bouquet-builder"
      className={form.form}
      action={() => {
        if (short) {
          setAttempted(true);
          return;
        }
        navigate(DETAILS_PATH);
      }}
      onChange={(e) =>
        selectFlowers(
          new FormData(e.currentTarget).getAll("flowers") as string[],
        )
      }
    >
      <fieldset className={form.fieldset}>
        <legend className={form["sub-heading"]}>Choose three blooms:</legend>
        <ul id="flower-list" className={styles["flower-list"]}>
          {Object.keys(flowers).map((key) => {
            const checked = bouquet.includes(key);
            const disabled = !checked && bouquet.length >= MAX_FLOWERS;
            // Selected and disabled flowers don't preview on hover or focus.
            const preview = () => {
              if (!checked && !disabled) onHover(key);
            };
            // Only stops this flower's preview, never another flower's.
            const stopPreview = () =>
              onHover((current) => (current === key ? null : current));
            return (
              <li key={key} className={styles.flower}>
                <input
                  id={"flower-" + key}
                  className={styles.checkbox}
                  type="checkbox"
                  name="flowers"
                  value={key}
                  defaultChecked={checked}
                  disabled={disabled}
                  aria-describedby={`flower-${key}-meaning flower-${key}-description`}
                  onFocus={preview}
                  onBlur={(e) => {
                    // Pressing a label blurs the focused checkbox just before the
                    // click focuses the new one, so don't stop while the pointer
                    // is over this card.
                    if (!e.currentTarget.labels?.[0]?.matches(":hover")) {
                      stopPreview();
                    }
                  }}
                />
                <label
                  htmlFor={"flower-" + key}
                  className={styles.card}
                  onPointerEnter={preview}
                  onPointerLeave={stopPreview}
                >
                  <img
                    className={styles.thumbnail}
                    src={"/images/flowers/" + key + ".png"}
                    alt=""
                  />
                  <span className={styles.text}>
                    <span className={styles.name}>{flowers[key].name}</span>
                    <span
                      id={`flower-${key}-meaning`}
                      className={styles.meaning}
                    >
                      {flowers[key].meaning}
                    </span>
                    <span
                      id={`flower-${key}-description`}
                      className={styles.description}
                    >
                      {flowers[key].description}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
      <p
        role="status"
        className={attempted && short ? form.invalid : undefined}
      >
        {attempted && short
          ? `Pray choose three blooms (${bouquet.length} of ${MAX_FLOWERS} chosen).`
          : `${bouquet.length} of ${MAX_FLOWERS} chosen`}
      </p>
      <button className="button">Name the recipient</button>
    </form>
  );
}
