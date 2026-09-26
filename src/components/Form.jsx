import { useCallback, useEffect, useState } from "react";
import HeroImage from "./HeroImage";
import BouquetDetails from "./BouquetDetails";
import FlowerSelect from "./FlowerSelect";
import FlowerDetails from "./FlowerDetails";
import PersonDetails from "./PersonDetails";
import { useAppState } from "../state/AppStateContext";

export default function Form() {
  const {
    bouquet,
    flowers,
    recipient,
    sender,
    steps,
    navigation,
    selectFlower,
    updateField,
    nextStep,
    prevStep,
    updateStep,
    enableButton,
  } = useAppState();

  const [activeFlower, setActiveFlower] = useState(Object.keys(flowers)[0]);

  useEffect(() => {
    if (enableButton) {
      enableButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateActiveFlower = useCallback((key) => {
    setActiveFlower((current) => (current !== key ? key : current));
  }, []);

  function formStepLeft() {
    switch (steps.current) {
      case 1:
        return {
          component: FlowerSelect,
          key: "flower-select",
          props: {
            bouquet,
            flowers,
            selectFlower,
            updateActiveFlower,
            enableButton,
          },
        };
      default:
        return {
          component: HeroImage,
          key: "hero-image",
          props: {
            bouquet,
            step: steps.current,
          },
        };
    }
  }

  function formStepRight() {
    switch (steps.current) {
      case 1:
        return {
          component: FlowerDetails,
          key: "flower-details",
          props: {
            bouquetLength: bouquet.length,
            flowers,
            activeFlower,
            nextCta: "View your bouquet",
            nextStep,
            navigation,
          },
        };
      case 2:
        return {
          component: BouquetDetails,
          key: "bouquet-details",
          props: {
            bouquet,
            flowers,
            prevCta: "Change bouquet",
            nextCta: "Their details",
            nextStep,
            prevStep,
            step: steps.current,
            enableButton,
            navigation,
          },
        };
      case 3:
        return {
          component: PersonDetails,
          key: "recipient",
          props: {
            index: "recipient",
            recipient,
            updateField,
            heading: "Their details",
            prevCta: "View bouquet",
            nextCta: "Your details",
            nextStep,
            prevStep,
            enableButton,
            navigation,
          },
        };

      case 4:
        return {
          component: PersonDetails,
          key: "sender",
          props: {
            index: "sender",
            sender,
            updateField,
            heading: "Your details",
            prevCta: "Their details",
            nextCta: "Confirm",
            prevStep,
            nextStep: "confirmation",
            enableButton,
            navigation,
          },
        };
      default:
        return {
          component: BouquetDetails,
          key: "bouquet-details",
          props: {
            bouquet,
            flowers,
            nextCta: "Win prizes",
            step: steps.current,
          },
        };
    }
  }

  const left = formStepLeft();
  const right = formStepRight();
  const LeftComponent = left.component;
  const RightComponent = right.component;
  let diamonds = [],
    classes = null,
    disabled = false;
  for (let i = 1; i <= steps.total; i++) {
    if (i === steps.current) {
      classes = "current";
    } else if (i > steps.current) {
      disabled = true;
      classes = null;
    }
    if (navigation.disabled) {
      disabled = true;
    }
    diamonds.push(
      <button
        key={i}
        className={classes}
        disabled={disabled}
        onClick={() => {
          updateStep(i);
        }}
      ></button>,
    );
  }
  return (
    <div id="form">
      <div id="scroller">
        <div>
          <div className="column">
            <LeftComponent key={left.key} {...left.props} />
          </div>
          <span id="divider"></span>
          <div className="column">
            <RightComponent key={right.key} {...right.props} />
          </div>
        </div>
      </div>
      <nav id="form-navigation">
        <div>{diamonds}</div>
      </nav>
    </div>
  );
}
