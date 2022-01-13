import { createContext, useReducer, useMemo } from "react";

import { UserReducer, initialState } from "./user.reducer";

export const UserContext = createContext();

export function UserContextWrapper({ children }) {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const userContextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}
