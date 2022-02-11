import { useDeleteRoom } from "../../../hooks/rooms.helpers";

describe("it test rooms helpers hooks", () => {
  it("should test useDeleteRoom function", () => {
    const roomsMock = [
      {
        room_id: "1",
        room_name: "test_room_1",
        created_by: "user_1",
        messages: [{ message_id: "1", content: "hello", message_sender: "af" }],
      },
      {
        room_id: "2",
        room_name: "test_room_2",
        created_by: "user_1",
        messages: [{ message_id: "2", content: "hi", message_sender: "ab" }],
      },
      {
        room_id: "3",
        room_name: "test_room_3",
        created_by: "user_1",
        messages: [{ message_id: "3", content: "holla", message_sender: "ac" }],
      },
    ];

    const expectedRooms = [
      {
        room_id: "2",
        room_name: "test_room_2",
        created_by: "user_1",
        messages: [{ message_id: "2", content: "hi", message_sender: "ab" }],
      },
      {
        room_id: "3",
        room_name: "test_room_3",
        created_by: "user_1",
        messages: [{ message_id: "3", content: "holla", message_sender: "ac" }],
      },
    ];

    expect(useDeleteRoom(roomsMock, "1")).toEqual(expectedRooms);
  });
});
