import { roomsTypes } from "./rooms.types";

export const getRoomsStart = () => {
  return {
    type: roomsTypes.GET_ROOMS_START,
  };
};

export const getRoomsSuccess = (rooms) => {
  return {
    type: roomsTypes.GET_ROOMS_SUCCESS,
    payload: rooms,
  };
};

export const getRoomsFailure = (errorMessage) => {
  return {
    type: roomsTypes.GET_ROOMS_FAILURE,
    payload: errorMessage,
  };
};

export const addMessageToRoomSuccess = (room_id, message) => {
  return {
    type: roomsTypes.ADD_MESSAGE_TO_ROOM_SUCCESS,
    payload: { room_id, message },
  };
};
