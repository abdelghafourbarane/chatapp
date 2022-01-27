import { createContext, useReducer, useMemo } from "react";

import { UserReducer, INITIAL_STATE } from "./user.reducer";

export const UserContext = createContext();

export function UserContextWrapper({ children }) {
  const [userState, userDispatch] = useReducer(UserReducer, INITIAL_STATE);

  const userContextValue = useMemo(() => {
    return { userState, userDispatch };
  }, [userState, userDispatch]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}
