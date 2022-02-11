import { roomsTypes } from "./rooms.types";

import { useAddMessageToRoom, useDeleteRoom } from "../../hooks/rooms.helpers";

export const INITIAL_STATE = {
  rooms: [],
  isLoading: false,
  errorMessage: null,
};

export const roomsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case roomsTypes.GET_ROOMS_START:
      return {
        ...state,
        isLoading: true,
      };

    case roomsTypes.GET_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
        isLoading: false,
      };

    case roomsTypes.GET_ROOMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };

    case roomsTypes.ADD_MESSAGE_TO_ROOM_SUCCESS:
      return {
        ...state,
        rooms: useAddMessageToRoom(
          state.rooms,
          action.payload.room_id,
          action.payload.message
        ),
      };

    case roomsTypes.DELETE_ROOM:
      return {
        ...state,
        rooms: useDeleteRoom(state.rooms, action.payload),
      };

    default:
      return state;
  }
};
