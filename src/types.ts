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
}

export interface PersonDetailsValues {
  senderName: string;
  recipientName: string;
  recipientEmail: string;
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
  | { type: "SET_BOUQUET"; keys: string[] }
  | { type: "SAVE_PERSON_DETAILS"; details: PersonDetailsValues }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "ENABLE_BUTTON" }
  | { type: "RESET"; initialState: AppState };

export interface AppContextValue extends AppState {
  mailChimp: () => void;
  selectFlowers: (keys: string[]) => void;
  savePersonDetails: (details: PersonDetailsValues) => void;
  nextStep: () => void;
  prevStep: () => void;
  enableButton: () => void;
  reset: () => void;
}
