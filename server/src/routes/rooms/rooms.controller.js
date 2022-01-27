const { createRoom, getRoomsWithMessages } = require("../../models/room.model");

const handleRoomAdd = (req, res) => {
  const { userId } = req;
  const { room_name } = req.body;
  createRoom(userId, room_name)
    .then((room) => {
      console.log("room returned is: ", room);
      res.status(200).json(room);
    })
    .catch((err) => {
      res.status(400).json("An error occured during room creation");
    });
};

const handleGetRoomsWithMessages = (req, res) => {
  getRoomsWithMessages()
    .then((roomsWithMessages) => {
      res.status(200).json(roomsWithMessages);
    })
    .catch((err) => {
      res.status(400).json("An error occured during rooms retrieving");
    });
};

module.exports = {
  handleRoomAdd,
  handleGetRoomsWithMessages,
};
