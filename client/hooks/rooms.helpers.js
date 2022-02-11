export const useAddMessageToRoom = (rooms, room_id, message) => {
  return rooms.map((room) =>
    room.room_id === room_id
      ? {
          ...room,
          messages: [...room.messages, message],
        }
      : room
  );
};

export const useDeleteRoom = (rooms, room_id) => {
  return rooms.filter((room) => room.room_id !== room_id);
};
