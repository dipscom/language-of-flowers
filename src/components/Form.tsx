import {
  useCallback,
  useEffect,
  useState,
  type ComponentProps,
  type ComponentType,
} from "react";
import HeroImage from "./HeroImage";
import BouquetDetails from "./BouquetDetails";
import FlowerSelect from "./FlowerSelect";
import FlowerDetails from "./FlowerDetails";
import PersonDetails from "./PersonDetails";
import { useAppState } from "../state/AppStateContext";

interface FormStep {
  component: ComponentType<any>;
  key: string;
  props: Record<string, unknown>;
}

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
  }, []);

  const updateActiveFlower = useCallback((key: string) => {
    setActiveFlower((current) => (current !== key ? key : current));
  }, []);

  function formStepLeft(): FormStep {
    switch (steps.current) {
      case 1: {
        const stepProps = {
          bouquet,
          flowers,
          selectFlower,
          updateActiveFlower,
          enableButton,
        } satisfies ComponentProps<typeof FlowerSelect>;
        return {
          component: FlowerSelect,
          key: "flower-select",
          props: { ...stepProps },
        };
      }
      default: {
        const stepProps = {
          bouquet,
        } satisfies ComponentProps<typeof HeroImage>;
        return {
          component: HeroImage,
          key: "hero-image",
          props: { ...stepProps },
        };
      }
    }
  }

  function formStepRight(): FormStep {
    switch (steps.current) {
      case 1: {
        const stepProps = {
          bouquetLength: bouquet.length,
          flowers,
          activeFlower,
          nextCta: "View your bouquet",
          nextStep,
          navigation,
        } satisfies ComponentProps<typeof FlowerDetails>;
        return {
          component: FlowerDetails,
          key: "flower-details",
          props: { ...stepProps },
        };
      }
      case 2: {
        const stepProps = {
          bouquet,
          flowers,
          prevCta: "Change bouquet",
          nextCta: "Their details",
          nextStep,
          prevStep,
          step: steps.current,
          enableButton,
          navigation,
        } satisfies ComponentProps<typeof BouquetDetails>;
        return {
          component: BouquetDetails,
          key: "bouquet-details",
          props: { ...stepProps },
        };
      }
      case 3: {
        const stepProps = {
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
        } satisfies ComponentProps<typeof PersonDetails>;
        return {
          component: PersonDetails,
          key: "recipient",
          props: { ...stepProps },
        };
      }

      case 4: {
        const stepProps = {
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
        } satisfies ComponentProps<typeof PersonDetails>;
        return {
          component: PersonDetails,
          key: "sender",
          props: { ...stepProps },
        };
      }
      default: {
        const stepProps = {
          bouquet,
          flowers,
          nextCta: "Win prizes",
          step: steps.current,
          navigation,
        } satisfies ComponentProps<typeof BouquetDetails>;
        return {
          component: BouquetDetails,
          key: "bouquet-details",
          props: { ...stepProps },
        };
      }
    }
  }

  const left = formStepLeft();
  const right = formStepRight();
  const LeftComponent = left.component;
  const RightComponent = right.component;
  let diamonds = [],
    classes: string | null = null,
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
        className={classes ?? undefined}
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
