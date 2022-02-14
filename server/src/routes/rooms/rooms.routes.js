const roomsRouter = require("express").Router();

const {
  handleRoomAdd,
  handleGetRoomsWithMessages,
  handleRoomDelete,
  handleRoomUpdate,
} = require("./rooms.controller");

roomsRouter.post("/", handleRoomAdd);
roomsRouter.get("/", handleGetRoomsWithMessages);
roomsRouter.delete("/", handleRoomDelete);
roomsRouter.put("/", handleRoomUpdate);

module.exports = {
  roomsRouter,
};
