export function createInitialState(flowers, products, overrides) {
  return {
    bouquet: [],
    flowers,
    products,
    recipient: { name: "", email: "", valid: false },
    sender: { name: "", email: "", valid: false },
    steps: { current: 1, total: 4 },
    terms: false,
    navigation: { disabled: false },
    ...overrides,
  };
}

export function appReducer(state, action) {
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
      if (action.field === "terms") {
        return { ...state, terms: action.checked };
      }
      if (action.field === "opt-in") {
        return state;
      }
      const person = { ...state[action.field], [action.name]: action.value };
      if (action.isEmail) {
        person.valid = action.valid;
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
