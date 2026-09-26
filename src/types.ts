import type { ChangeEvent } from "react";

export interface FlowerData {
  name: string;
  description: string;
  meaning: string;
  selected: boolean;
}

export type FlowersById = Record<string, FlowerData>;

export interface Product {
  name: string;
  description: string;
  link: string;
}

export type ProductsById = Record<string, Product>;

export interface Person {
  name: string;
  email: string;
  valid: boolean;
}

export interface Navigation {
  disabled: boolean;
}

export interface Steps {
  current: number;
  total: number;
}

export interface AppState {
  bouquet: string[];
  flowers: FlowersById;
  products: ProductsById;
  recipient: Person;
  sender: Person;
  steps: Steps;
  navigation: Navigation;
}

export type AppAction =
  | { type: "SELECT_FLOWER"; key: string }
  | {
      type: "UPDATE_FIELD";
      field: "recipient" | "sender";
      name: string;
      value: string;
      isEmail: boolean;
      valid?: boolean;
    }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "UPDATE_STEP"; step: number }
  | { type: "ENABLE_BUTTON" };

export interface AppContextValue extends AppState {
  mailChimp: () => void;
  selectFlower: (key: string) => void;
  updateField: (e: ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateStep: (step: number) => void;
  enableButton: () => void;
}
