import type { ChangeEvent } from "react";

export interface FlowerData {
  name: string;
  description: string;
  meaning: string;
  selected: boolean;
}

export type FlowersById = Record<string, FlowerData>;

export interface Person {
  name: string;
  email: string;
  valid: boolean;
}

export interface Navigation {
  disabled: boolean;
}

export interface Sender {
  name: string;
}

export interface Steps {
  current: number;
}

export interface AppState {
  bouquet: string[];
  flowers: FlowersById;
  recipient: Person;
  sender: Sender;
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
  | { type: "ENABLE_BUTTON" }
  | { type: "RESET"; initialState: AppState };

export interface AppContextValue extends AppState {
  mailChimp: () => void;
  selectFlower: (key: string) => void;
  updateField: (e: ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  enableButton: () => void;
  reset: () => void;
}
