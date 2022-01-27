import { useMemo, createContext, useReducer } from "react";

import { INITIAL_STATE, roomsReducer } from "./rooms.reducers";

export const RoomsContext = createContext();

export function RoomsContextWrapper({ children }) {
  const [roomsState, roomsDispatcher] = useReducer(roomsReducer, INITIAL_STATE);

  const roomsContextValue = useMemo(() => {
    return { roomsState, roomsDispatcher };
  }, [roomsState, roomsDispatcher]);

  return (
    <RoomsContext.Provider value={roomsContextValue}>
      {children}
    </RoomsContext.Provider>
  );
}
