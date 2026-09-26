import { createContext, useCallback, useContext, useReducer } from "react";
import { appReducer, createInitialState } from "./appReducer";

const AppStateContext = createContext(null);

export function AppStateProvider({ flowers, products, children }) {
  const [state, dispatch] = useReducer(appReducer, undefined, () =>
    createInitialState(flowers, products),
  );

  const mailChimp = useCallback(() => {}, []);

  const selectFlower = useCallback((key) => {
    dispatch({ type: "SELECT_FLOWER", key });
  }, []);

  const updateField = useCallback((e) => {
    const isEmail = e.target.type === "email";
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.className,
      name: e.target.name,
      value: e.target.value,
      isEmail,
      valid: isEmail ? e.target.checkValidity() : undefined,
    });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: "NEXT_STEP" });
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: "PREV_STEP" });
  }, []);

  const updateStep = useCallback((step) => {
    dispatch({ type: "UPDATE_STEP", step });
  }, []);

  const enableButton = useCallback(() => {
    dispatch({ type: "ENABLE_BUTTON" });
  }, []);

  const value = {
    ...state,
    mailChimp,
    selectFlower,
    updateField,
    nextStep,
    prevStep,
    updateStep,
    enableButton,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return ctx;
}
