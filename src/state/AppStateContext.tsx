import {
  useCallback,
  useReducer,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { appReducer, createInitialState } from "./appReducer";
import AppStateContext from "./appStateContext";
import type { AppContextValue, FlowersById, ProductsById } from "../types";

interface AppStateProviderProps {
  flowers: FlowersById;
  products: ProductsById;
  children: ReactNode;
}

export function AppStateProvider({
  flowers,
  products,
  children,
}: AppStateProviderProps) {
  const [state, dispatch] = useReducer(appReducer, undefined, () =>
    createInitialState(flowers, products),
  );

  const mailChimp = useCallback(() => {}, []);

  const selectFlower = useCallback((key: string) => {
    dispatch({ type: "SELECT_FLOWER", key });
  }, []);

  const updateField = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const isEmail = e.target.type === "email";
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.className as "recipient" | "sender",
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

  const updateStep = useCallback((step: number) => {
    dispatch({ type: "UPDATE_STEP", step });
  }, []);

  const enableButton = useCallback(() => {
    dispatch({ type: "ENABLE_BUTTON" });
  }, []);

  const value: AppContextValue = {
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
