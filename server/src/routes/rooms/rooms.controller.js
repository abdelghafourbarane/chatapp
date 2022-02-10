const {
  createRoom,
  getRoomsWithMessages,
  deleteRoom,
} = require("../../models/room.model");

const handleRoomAdd = (req, res) => {
  const { userId } = req;
  const { room_name } = req.body;
  createRoom(userId, room_name)
    .then((room) => {
      return res.status(200).json(room);
    })
    .catch((err) => {
      if (err.code === "23505") {
        //if there is a unique_violation
        return res
          .status(409)
          .json({ errMessage: "'" + room_name + "'  already exist" });
      }
      return res.status(400).json("An error occured during room creation");
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

const handleRoomDelete = (req, res) => {
  const { room_id } = req.query;
  deleteRoom(room_id)
    .then((room) => {
      res.status(200).json(room);
    })
    .catch((err) => {
      res.status(400).json("An error occured during room deletion");
    });
};

module.exports = {
  handleRoomAdd,
  handleGetRoomsWithMessages,
  handleRoomDelete,
};
