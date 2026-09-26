import { createContext } from "react";
import type { AppContextValue } from "../types";

const AppStateContext = createContext<AppContextValue | null>(null);

export default AppStateContext;
