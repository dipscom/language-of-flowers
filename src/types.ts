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

export interface Sender {
  name: string;
}

export interface AppState {
  // Selected flowers, compacted, in slot order.
  bouquet: string[];
  // Fixed-size positions in the visualiser; "" marks an empty slot.
  slots: string[];
  // Empty slot indexes, in the order they were vacated.
  freeSlots: number[];
  flowers: FlowersById;
  recipient: Person;
  sender: Sender;
}

export type AppAction =
  | { type: "SET_BOUQUET"; keys: string[] }
  | { type: "SAVE_PERSON_DETAILS"; details: PersonDetailsValues }
  | { type: "RESET"; initialState: AppState };

export interface AppContextValue extends AppState {
  selectFlowers: (keys: string[]) => void;
  savePersonDetails: (details: PersonDetailsValues) => void;
  reset: () => void;
}
