export const useAddMessageToRoom = (rooms, room_id, message) => {
  console.log("inside useAddMessagesToRoom,rooms: ", rooms);
  console.log("inside useAddMessagesToRoom,room_id: ", room_id);
  console.log("inside useAddMessagesToRoom,message: ", message);

  return rooms.map((room) =>
    room.room_id === room_id
      ? {
          ...room,
          messages: [...room.messages, message],
        }
      : room
  );
};
