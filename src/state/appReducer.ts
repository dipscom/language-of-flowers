import type { AppAction, AppState, FlowersById, ProductsById } from "../types";

export function createInitialState(
  flowers: FlowersById,
  products: ProductsById,
): AppState {
  return {
    bouquet: [],
    flowers,
    products,
    recipient: { name: "", email: "", valid: false },
    sender: { name: "", email: "", valid: false },
    steps: { current: 1, total: 4 },
    navigation: { disabled: false },
  };
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SELECT_FLOWER": {
      const index = state.bouquet.indexOf(action.key);
      const flowers = { ...state.flowers };
      if (index === -1) {
        if (state.bouquet.length >= 3) return state;
        flowers[action.key] = { ...flowers[action.key], selected: true };
        return { ...state, bouquet: [...state.bouquet, action.key], flowers };
      }
      flowers[action.key] = { ...flowers[action.key], selected: false };
      return {
        ...state,
        bouquet: [
          ...state.bouquet.slice(0, index),
          ...state.bouquet.slice(index + 1),
        ],
        flowers,
      };
    }
    case "UPDATE_FIELD": {
      const person = { ...state[action.field], [action.name]: action.value };
      if (action.isEmail) {
        person.valid = action.valid ?? false;
      }
      return { ...state, [action.field]: person };
    }
    case "NEXT_STEP":
      return {
        ...state,
        steps: { ...state.steps, current: state.steps.current + 1 },
        navigation: { disabled: true },
      };
    case "PREV_STEP":
      return {
        ...state,
        steps: { ...state.steps, current: state.steps.current - 1 },
        navigation: { disabled: true },
      };
    case "UPDATE_STEP":
      return {
        ...state,
        steps: { ...state.steps, current: action.step },
        navigation: { disabled: true },
      };
    case "ENABLE_BUTTON":
      return { ...state, navigation: { disabled: false } };
    default:
      return state;
  }
}
