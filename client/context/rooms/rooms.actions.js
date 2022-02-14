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

export const addNewRoom = (room, username) => {
  return {
    type: roomsTypes.ADD_NEW_ROOM,
    payload: { room, username },
  };
};

export const deleteRoom = (room_id) => {
  return {
    type: roomsTypes.DELETE_ROOM,
    payload: room_id,
  };
};

export const updateRoom = (room_id, room_name) => {
  return {
    type: roomsTypes.UPDATE_ROOM,
    payload: {
      room_id: room_id,
      room_name: room_name,
    },
  };
};
