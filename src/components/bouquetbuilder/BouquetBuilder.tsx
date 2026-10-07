import type { Dispatch, SetStateAction } from "react";
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

  return (
    <form
      id="bouquet-builder"
      className={form.form}
      action={() => navigate(DETAILS_PATH)}
      onChange={(e) =>
        selectFlowers(
          new FormData(e.currentTarget).getAll("flowers") as string[],
        )
      }
    >
      <p className={form["sub-heading"]}>Select {MAX_FLOWERS} flowers:</p>
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
                <div className={styles.text}>
                  <p className={styles.name}>{flowers[key].name}</p>
                  <p className={styles.meaning}>{flowers[key].meaning}</p>
                  <p className={styles.description}>
                    {flowers[key].description}
                  </p>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
      <button className="button" disabled={bouquet.length < MAX_FLOWERS}>
        Delivery details
      </button>
    </form>
  );
}
