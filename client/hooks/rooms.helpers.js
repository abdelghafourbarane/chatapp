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

export const useUpdateRoom = (room_id, room_name, rooms) => {
  return rooms.map((room) =>
    room.room_id === room_id ? { ...room, room_name: room_name } : room
  );
};
